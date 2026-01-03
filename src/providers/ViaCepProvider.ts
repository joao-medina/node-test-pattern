import axios from "axios";

import { Address } from "../models/Address.js";

type ViaCepResponse = {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
};

export class ViaCepProvider {
  async getByCep(cep: string): Promise<Address> {
    const normalizedCep = Address.normalizeCep(cep);
    if (!Address.isValidCep(normalizedCep)) {
      throw new Error("Invalid CEP");
    }

    const response = await axios.get<ViaCepResponse>(
      `https://viacep.com.br/ws/${normalizedCep}/json/`
    );

    if (response.data.erro) {
      throw new Error("CEP not found");
    }

    return Address.fromViaCep(response.data);
  }
}

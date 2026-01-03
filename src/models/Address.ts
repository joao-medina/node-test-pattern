type CepDTO = {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
};

export class Address {
  readonly cep: string;
  readonly street: string;
  readonly neighborhood: string;
  readonly city: string;
  readonly state: string;

  constructor(params: {
    cep: string;
    street: string;
    neighborhood: string;
    city: string;
    state: string;
  }) {
    const normalizedCep = Address.normalizeCep(params.cep);
    if (!Address.isValidCep(normalizedCep)) {
      throw new Error("Invalid CEP");
    }

    this.cep = normalizedCep;
    this.street = params.street.trim();
    this.neighborhood = params.neighborhood.trim();
    this.city = params.city.trim();
    this.state = params.state.trim();
  }

  static fromViaCep(dto: CepDTO): Address {
    return new Address({
      cep: dto.cep,
      street: dto.logradouro,
      neighborhood: dto.bairro,
      city: dto.localidade,
      state: dto.uf,
    });
  }

  static normalizeCep(cep: string): string {
    return cep.replace(/\D/g, "");
  }

  static isValidCep(cep: string): boolean {
    return /^\d{8}$/.test(cep);
  }
}

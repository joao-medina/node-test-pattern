import axios from "axios";
import { vi } from "vitest";
import type { Mocked } from "vitest";
import { Address } from "../models/Address.js";
import { ViaCepProvider } from "./ViaCepProvider.js";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
  },
}));

const mockedAxios = axios as Mocked<typeof axios>;

describe("ViaCepProvider", () => {
  beforeEach(() => {
    mockedAxios.get.mockReset();
  });

  it("rejects invalid CEP before calling the API", async () => {
    const provider = new ViaCepProvider();

    await expect(provider.getByCep("123")).rejects.toThrow("Invalid CEP");
    expect(mockedAxios.get).not.toHaveBeenCalled();
  });

  it("throws when API returns not found", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        erro: true,
      },
    });

    const provider = new ViaCepProvider();

    await expect(provider.getByCep("01001000")).rejects.toThrow("CEP not found");
  });

  it("returns an Address for a valid CEP", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        cep: "01001000",
        logradouro: "Praca da Se",
        bairro: "Se",
        localidade: "Sao Paulo",
        uf: "SP",
      },
    });

    const provider = new ViaCepProvider();
    const result = await provider.getByCep("01001-000");

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://viacep.com.br/ws/01001000/json/"
    );
    expect(result).toEqual(
      new Address({
        cep: "01001000",
        street: "Praca da Se",
        neighborhood: "Se",
        city: "Sao Paulo",
        state: "SP",
      })
    );
  });
});

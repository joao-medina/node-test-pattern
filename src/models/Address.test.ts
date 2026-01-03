import { Address } from "./Address.js";

describe("Address", () => {
  it("normalizes CEP and trims fields", () => {
    const address = new Address({
      cep: "12.345-678",
      street: " Rua A ",
      neighborhood: " Centro ",
      city: " Sao Paulo ",
      state: " SP ",
    });

    expect(address.cep).toBe("12345678");
    expect(address.street).toBe("Rua A");
    expect(address.neighborhood).toBe("Centro");
    expect(address.city).toBe("Sao Paulo");
    expect(address.state).toBe("SP");
  });

  it("throws for invalid CEP", () => {
    expect(
      () =>
        new Address({
          cep: "123",
          street: "Rua A",
          neighborhood: "Centro",
          city: "Sao Paulo",
          state: "SP",
        })
    ).toThrow("Invalid CEP");
  });

  it("builds from DTO", () => {
    const address = Address.fromViaCep({
      cep: "01001000",
      logradouro: "Praca da Se",
      bairro: "Se",
      localidade: "Sao Paulo",
      uf: "SP",
    });

    expect(address).toEqual(
      new Address({
        cep: "01001000",
        street: "Praca da Se",
        neighborhood: "Se",
        city: "Sao Paulo",
        state: "SP",
      })
    );
  });

  it("validates CEP format", () => {
    expect(Address.isValidCep("01001000")).toBe(true);
    expect(Address.isValidCep("01001-000")).toBe(false);
  });
});

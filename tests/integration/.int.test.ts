import { ViaCepProvider } from "../../src/providers/ViaCepProvider.js";

describe("ViaCepProvider integration", () => {
  const provider = new ViaCepProvider();

  it("fetches an address by CEP from ViaCep", async () => {
    const address = await provider.getByCep("01001-000");

    expect(address.cep).toBe("01001000");
    expect(address.state).toBe("SP");
    expect(address.city.length).toBeGreaterThan(1);
  });

  it("throws when the CEP does not exist", async () => {
    await expect(provider.getByCep("00000000")).rejects.toThrow("CEP not found");
  });
});

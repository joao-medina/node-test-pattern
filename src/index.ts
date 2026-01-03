import { Address } from "./models/Address.js";
import { ViaCepProvider } from "./providers/ViaCepProvider.js";

async function init() {
  try {
    const cepProvider = new ViaCepProvider();
    const address: Address = await cepProvider.getByCep('01001-000');
    console.log(address);
  } catch(error) {
    console.error(error);
  }
}

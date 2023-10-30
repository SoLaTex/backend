import { Injectable } from "@nestjs/common";
import { ComputeEngine } from "@cortex-js/compute-engine";
import { formatResultForResponseInterceptor } from "../../helpers/functions";
import { SymbolType } from "../../types";

@Injectable()
export class FunctionsService {
  validateFunction (fn: string) {
    const ce = new ComputeEngine();
    const expression = ce.parse(fn);

    const isValid = expression.isValid;

    const msg = isValid
      ? "Given function is valid!"
      : "Given function is invalid!";

    return formatResultForResponseInterceptor(
      isValid,
      msg,
    );
  }

  fetchSymbols (fn: string) {
    const checkValidity = this.validateFunction(fn);
    if (!checkValidity.data) return checkValidity;

    const ce = new ComputeEngine({ numericPrecision: 5 });
    const expression = ce.parse(fn);

    const { symbols } = expression.canonical;

    const symbolsWithType = symbols.map(s => {
      const sym = ce.box(s);
      return {
        symbol: sym.symbol,
        type: sym.isConstant ? SymbolType.Constant : SymbolType.Variable,
        value: sym.value,
      };
    });

    return formatResultForResponseInterceptor(
      symbolsWithType,
      "Symbols fetched successfully!",
    );
  }
}

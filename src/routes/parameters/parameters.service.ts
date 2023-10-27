import { Injectable } from "@nestjs/common";
import { UpdateParameterDto } from "./dto/update-parameter.dto";
import { PrismaService } from "../../prisma/prisma.service";
import { formatResultForResponseInterceptor } from "../../helpers/functions";

// const ParameterCreate: Prisma.ParameterCreateInput = {
//
// };

@Injectable()
export class ParametersService {
  constructor (private prisma: PrismaService) {}

  async create (createParameterDto: any, userId: string) {
    const res = await this.prisma.parameter.create({
      data: {
        name: createParameterDto.name,
        description: createParameterDto.description,
        outputUnit: createParameterDto.outputUnit,
        formulas: {
          create: createParameterDto.formulas.map(fm => ({
            name: fm.name,
            isFinalFormula: fm.isFinalFormula,
            formula: fm.formula,
            symbols: {
              create: fm.symbols.map(s => ({
                symbol: s.symbol,
                type: s.type,
                value: s.value,
                description: s.description,
              })),
            },
          })),
        },
        userId,
      },
    });

    return formatResultForResponseInterceptor(
      res,
      "New parameter created successfully!",
    );
  }

  async update (id: string, oldParameterData: UpdateParameterDto) {
    const res = await this.prisma.$transaction(async (tx) => {
      const updatedResult = await tx.parameter.update({
        where: { id },
        data: {
          name: oldParameterData.name,
          description: oldParameterData.description,
          outputUnit: oldParameterData.outputUnit,
          formulas: {
            upsert: oldParameterData.formulas.map(formula => ({
              where: { id: formula.id ?? "" },
              update: {
                id: formula.id,
                name: formula.name,
                isFinalFormula: formula.isFinalFormula,
                formula: formula.formula,
                symbols: {
                  upsert: formula.symbols.map(symbol => ({
                    where: { id: symbol.id ?? "" },
                    update: {
                      id: symbol.id,
                      symbol: symbol.symbol,
                      type: symbol.type,
                      value: symbol.value,
                      description: symbol.description,
                    },
                    create: {
                      symbol: symbol.symbol,
                      type: symbol.type,
                      value: symbol.value,
                      description: symbol.description,
                    },
                  })),
                },
              },
              create: {
                name: formula.name,
                isFinalFormula: formula.isFinalFormula,
                formula: formula.formula,
                symbols: {
                  create: formula.symbols.map(symbol => ({
                    symbol: symbol.symbol,
                    type: symbol.type,
                    value: symbol.value,
                    description: symbol.description,
                  })),
                },
              },
            })),
          },
        },
        include: {
          formulas: {
            include: {
              symbols: true,
            },
          },
        },
      });

      // Get the updated formulas
      const updatedFormulas = updatedResult.formulas;

      // Get the IDs of the updated formulas
      const updatedFormulaIds = updatedFormulas.map(formula => formula.id);

      // Find the formulas that are not included in the update operation
      const formulasToDelete = await tx.formula.findMany({
        where: {
          id: {
            notIn: updatedFormulaIds,
          },
        },
      });

      // Delete the formulas that are not included in the update operation
      if (formulasToDelete.length > 0) {
        await tx.formula.deleteMany({
          where: {
            id: {
              in: formulasToDelete.map(formula => formula.id),
            },
          },
        });
      }

      return updatedResult;
    });

    return formatResultForResponseInterceptor(
      res,
      "Updated Parameter Successfully!");
  }

  findAll () {
    return formatResultForResponseInterceptor(
      `This action returns all parameters`, "This action adds a new parameter");
  }

  async findOne (id: string) {
    const res = await this.prisma.parameter.findUnique({
      where: { id },
      include: {
        formulas: {
          include: {
            symbols: true,
          },
        },
      },
    });

    return formatResultForResponseInterceptor(
      res,
      "Parameter Data");
  }

  remove (id: string) {
    return formatResultForResponseInterceptor(
      `This action removes a #${id} parameter`,
      "This action adds a new parameter");
  }
}

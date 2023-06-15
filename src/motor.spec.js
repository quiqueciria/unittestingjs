import { describe, expect, it } from "vitest";
import {
  comprobarNumero,
  generarNumeroAleatorio,
  comprobarNumeroB,
} from "./motor";
import {
  NO_ES_UN_NUMERO,
  ES_EL_NUMERO_SECRETO,
  EL_NUMERO_ES_MAYOR,
  EL_NUMERO_ES_MENOR,
  GAME_OVER_MAXIMO_INTENTOS,
} from "./modelo";
import * as modelo from "./modelo";
import { beforeEach } from "vitest";

describe("comprobarNumero", () => {
  beforeEach(() => {
    vi.spyOn(modelo, "numeroParaAcertar", "get").mockReturnValue(23);
  });

  it("Debería devolver NO_ES_UN_NUMERO cuando el texto no es un número", () => {
    // Arrange
    const texto = "esto no es un número";

    // Act
    const resultado = comprobarNumero(texto);

    //Assert
    expect(resultado).toBe(NO_ES_UN_NUMERO);
  });

  it("Debería de devolver ES_EL_NUMERO_SECRETO cuando el texto es el número a acertar", () => {
    //Arrange
    const texto = "23";

    //Act
    const resultado = comprobarNumero(texto);

    //Assert
    expect(resultado).toBe(ES_EL_NUMERO_SECRETO);
  });

  it("Debería devolver EL_NUMERO_ES_MAYOR cuando el texto es mayor que el número a acertar", () => {
    //Arrange
    const texto = "24";

    //Act
    const resultado = comprobarNumero(texto);

    //Assert
    expect(resultado).toBe(EL_NUMERO_ES_MAYOR);
  });

  it("Deberia devolver EL_NUMERO_ES_MENOR cuando el texto es menor que el número a aceptar", () => {
    //Arrange
    const texto = "22";

    //Act
    const resultado = comprobarNumero(texto);

    //Assert
    expect(resultado).toBe(EL_NUMERO_ES_MENOR);
  });

  it("Debería de devolver GAME_OVER_MAXIMO_INTENTOS cuando se ha superado el número máximo de intentos", async () => {
    //Arrange
    const texto = "70";
    vi.spyOn(modelo, "numeroDeIntentos", "get").mockReturnValue(5);

    //Act
    const resultado = comprobarNumero(texto);

    //Assert
    expect(resultado).toBe(GAME_OVER_MAXIMO_INTENTOS);
  });
});

describe("generarNumeroAleatorio", () => {
  it("MathRandom lo forzamos a que devuelva 0, debería de devolver 0", () => {
    //Arrange
    const numeroEsperado = 0;
    vi.spyOn(global.Math, "random").mockReturnValue(0);

    //Act
    const resultado = generarNumeroAleatorio();

    //Assert
    expect(resultado).toBe(numeroEsperado);
  });

  it("MathRandom lo forzamos a que devuelva 0.9999, debería de devolvere 100", () => {
    //Arrange
    const numeroEsperado = 100;
    vi.spyOn(global.Math, "random").mockReturnValue(0.999);

    //Act
    const resultado = generarNumeroAleatorio();

    //Assert
    expect(resultado).toBe(numeroEsperado);
  });
});

describe("comprobarNumeroB", () => {
  it("el numero es mayor que el número que aceptar", () => {
    //Arrange
    const texto = "25";
    const numeroAcertar = 24;

    //Act
    const resultado = comprobarNumeroB(texto, numeroAcertar);

    //Assert
    expect(resultado).toBe(EL_NUMERO_ES_MAYOR);
  });
  it("el numero es menor que el número que aceptar", () => {
    //Arrange
    const texto = "23";
    const numeroAcertar = 24;

    //Act
    const resultado = comprobarNumeroB(texto, numeroAcertar);

    //Assert
    expect(resultado).toBe(EL_NUMERO_ES_MENOR);
  });
  it("el número introducido es el que teníamos que aceptar", () => {
    //Arrange
    const texto = "24";
    const numeroAcertar = 24;

    //Act
    const resultado = comprobarNumeroB(texto, numeroAcertar);

    //Assert
    expect(resultado).toBe(ES_EL_NUMERO_SECRETO);
  });
  it("el texto introducido no es un número", () => {
    //Arrange
    const texto = "Introducimos un texto";
    const numeroAcertar = 24;

    //Act
    const resultado = comprobarNumeroB(texto, numeroAcertar);

    //Assert
    expect(resultado).toBe(NO_ES_UN_NUMERO);
  });
});

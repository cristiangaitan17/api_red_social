/**
 * clase encargada de construir las respuestas de la API de manera estandarizada
 */

export class ResponseHelper {
    /** */
  static success(
    data: any,
    statusCode=200

  ) {
    return {
      success: true,
      statusCode,
      data,
    };
  }
  /**
   * respuesta error
   */
  static error(
    data: any,
    statusCode=400,
  ) {
    return {
      success: false,
      statusCode,
      data,
    };
  }
}
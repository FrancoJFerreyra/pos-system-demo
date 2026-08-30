import {
  ForeignKeyConstraintError,
  ResourceNotFoundError,
  UniqueConstraintError,
} from "./errors.js";

function isPrismaKnownRequestError(
  error: unknown,
): error is { code: string; meta?: Record<string, unknown> } {
  return (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    (error as { name: string }).name === "PrismaClientKnownRequestError" &&
    "code" in error &&
    typeof (error as { code: unknown }).code === "string"
  );
}

export function mapPrismaError(error: unknown): unknown {
  if (!isPrismaKnownRequestError(error)) {
    return error;
  }

  switch (error.code) {
    case "P2025":
      return new ResourceNotFoundError(
        (error.meta?.modelName as string | undefined) ?? "Resource",
        { ...(error.meta ?? {}) },
      );
    case "P2002": {
      const target = error.meta?.target as string[] | undefined;
      const field = target?.[0] ?? "field";
      return new UniqueConstraintError(field, null);
    }
    case "P2003": {
      const field = (error.meta?.field_name as string | undefined) ?? "field";
      const referencedTable =
        (error.meta?.model_name as string | undefined) ?? "referenced";
      return new ForeignKeyConstraintError(field, referencedTable, null);
    }
    default:
      return error;
  }
}

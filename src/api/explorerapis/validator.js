import Joi from "joi";

export const validator = {
    create: Joi.object({
        body: Joi.array().items(
            Joi.object({
                path: Joi.string()
                    .max(4096)
                    .regex(/\/\.\./, { name: "path cannot have '/..", invert: true })
                    .regex(/\.\./, { name: "path cannot have '..", invert: true })
                    .regex(/^[0-9a-zA-Z/.]+$/, "Path Name")
                    .required(),
                names: Joi.array().items(
                    Joi.string()
                        .max(200)
                        .regex(/\.\./, { name: "name cannot have '..", invert: true })
                        .regex(/^[0-9a-zA-Z.]+$/, "File Name")
                        .required(),
                ),
            }),
        ),
    }),
};

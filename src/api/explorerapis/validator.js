import Joi from "joi";
const maxVeryLongStr = 200;
const maxPathLength = 4096;

export const validator = {
    create: Joi.object({
        body: Joi.array().items(
            Joi.object({
                path: Joi.string()
                    .max(maxPathLength)
                    .regex(/\/\.\./, { name: "path cannot have '/..", invert: true })
                    .regex(/\.\./, { name: "path cannot have '..", invert: true })
                    .regex(/^[0-9a-zA-Z/.]+$/, "Path Name")
                    .required(),
                names: Joi.array().items(
                    Joi.string()
                        .max(maxVeryLongStr)
                        .regex(/\.\./, { name: "name cannot have '..", invert: true })
                        .regex(/^[0-9a-zA-Z.]+$/, "File Name")
                        .required(),
                ),
            }),
        ),
    }),
    read: Joi.object({
        query: Joi.object({
            path: Joi.string()
                .allow("")
                .regex(/\/\.\./, { name: "path cannot have '/..", invert: true })
                .regex(/\.\./, { name: "path cannot have '..", invert: true })
                .regex(/^[0-9a-zA-Z./]+$/, "Path"),
        }),
    }),
    update: Joi.object({
        body: Joi.array().items(
            Joi.object({
                path: Joi.string()
                    .max(maxPathLength)
                    .regex(/\/\.\./, { name: "path cannot have '/..", invert: true })
                    .regex(/\.\./, { name: "path cannot have '..", invert: true })
                    .regex(/^[0-9a-zA-Z/.]+$/, "Path Name")
                    .required(),
                names: Joi.array()
                    .items(
                        Joi.array()
                            .items(
                                Joi.string()
                                    .max(maxVeryLongStr)
                                    .regex(/\.\./, {
                                        name: "name cannot have '..",
                                        invert: true,
                                    })
                                    .regex(/^[0-9a-zA-Z.]+$/, "File Name"),
                            )
                            .min(2)
                            .max(2),
                    )
                    .required(),
            }),
        ),
    }),
    remove: Joi.object({
        body: Joi.array().items(
            Joi.object({
                path: Joi.string()
                    .max(maxPathLength)
                    .regex(/\/\.\./, { name: "path cannot have '/..", invert: true })
                    .regex(/\.\./, { name: "path cannot have '..", invert: true })
                    .regex(/^[0-9a-zA-Z/.]+$/, "Path Name")
                    .required(),
                names: Joi.array().items(
                    Joi.string()
                        .max(maxVeryLongStr)
                        .regex(/\.\./, { name: "name cannot have '..", invert: true })
                        .regex(/^[0-9a-zA-Z.]+$/, "File Name")
                        .required(),
                ),
            }),
        ),
    }),
};

import { Type } from '@sinclair/typebox'

const SourceIdSchema = Type.Object({
    sourceId: Type.Integer()
})

const JobIdSchema = Type.Object({
    jobId: Type.String()
})

export { SourceIdSchema, JobIdSchema }
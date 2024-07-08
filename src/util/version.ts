import z from 'zod'

const MinecraftChannel = z.union([
  z.literal('release'),
  z.literal('snapshot'),
  z.literal('other'),
])

const MinecraftProperty = z.object({
  version: z.union([z.string(), z.literal('latest')]),
  channel: MinecraftChannel,
})

const ModApi = z.union([
  z.literal('fabric'),
  z.literal('forge'),
  z.literal('liteloader'),
])

const ModProperty = z.object({
  api: ModApi,
  count: z.number(),
})

const VersionProperties = z.object({
  minecraft: MinecraftProperty,
  mod: z.optional(ModProperty),
})

const VersionGroup = z.object({
  id: z.string(),
  name: z.string(),
})

const Version = z.object({
  id: z.string(),
  name: z.optional(z.string()),
  group: z.optional(z.string()),
  properties: VersionProperties,
})

const VersionEvent = z.object({
  versions: z.array(Version),
  groups: z.array(VersionGroup),
})

export {
  MinecraftChannel,
  MinecraftProperty,
  ModApi,
  ModProperty,
  VersionProperties,
  Version,
  VersionGroup,
  VersionEvent,
}

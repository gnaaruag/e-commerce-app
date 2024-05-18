import { createClient } from '@sanity/client'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID

export default createClient({
  projectId: projectId,
  dataset: "production",
  apiVersion: "2024-03-11",
  useCdn: true, 
})
import {createClient} from '@sanity/client'

export default createClient({
	projectId:"xle18hlu",
	dataset:"production"
})

/**
 * import { createClient } from "@sanity/client"

export const client = createClient({
   projectId: "5lmtqlwi", 
   dataset: "production", 
   apiVersion: "2024-03-11",
   // Set to `true` for production environments
   useCdn: false, 
})
 */
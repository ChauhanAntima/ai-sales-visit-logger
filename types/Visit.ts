export type SyncStatus =
 | "draft"
 | "syncing"
 | "synced"
 | "failed"

export interface Visit {
 id: string
 customerName: string
 contactPerson: string
 location: string
 visitDate: string
 notes: string
 outcome: string
 followUpDate?: string
 aiSummary?: string
 syncStatus: SyncStatus
}
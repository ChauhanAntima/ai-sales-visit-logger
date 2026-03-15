export const validateVisit = (visit:any) => {

 if(!visit.customerName) return "Customer name required"

 if(visit.outcome==="follow-up needed" && !visit.followUpDate)
 return "Follow up date required"

 return null
}
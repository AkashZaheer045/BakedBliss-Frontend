import { useEffect, useState } from 'react';
import { adminService } from '@/services';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Log {
    id: number;
    user_id: string;
    action: string;
    details: any;
    created_at: string;
}

export const RecentActivity = () => {
    const [logs, setLogs] = useState<Log[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const res = await adminService.getActivityLogs({ limit: 20 });
                if (res.status === 'success' && res.data?.logs) {
                    setLogs(res.data.logs);
                }
            } catch (e) { 
                console.error("Failed to fetch logs", e); 
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, []);
    
    if (loading) {
        return <div className="p-4 text-center text-sm text-muted-foreground">Loading activity...</div>;
    }

    return (
        <ScrollArea className="h-[350px] pr-4">
           <div className="space-y-4">
               {logs.map((log) => (
                   <div key={log.id} className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                       <Avatar className="h-8 w-8 mt-0.5 bg-orange-100">
                           <AvatarFallback className="text-xs text-orange-600 font-bold">
                               {log.action.substring(0, 2)}
                           </AvatarFallback>
                       </Avatar>
                       <div className="flex-1 space-y-1">
                           <div className="flex items-center justify-between">
                               <p className="text-sm font-medium text-gray-900">{log.action.replace(/_/g, ' ')}</p>
                               <span className="text-xs text-gray-400">{new Date(log.created_at).toLocaleDateString()}</span>
                           </div>
                           <p className="text-xs text-gray-500 max-w-[200px] truncate">
                               {log.user_id ? `User: ${log.user_id}` : 'System Action'}
                           </p>
                       </div>
                   </div>
               ))}
               {logs.length === 0 && <p className="text-muted-foreground text-center py-8">No recent activity recorded.</p>}
           </div>
        </ScrollArea>
    );
};

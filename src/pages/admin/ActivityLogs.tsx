
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { adminService } from "@/services";
import { Loader2, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ActivityLogs = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const response = await adminService.getActivityLogs({ limit: 50 });
      if (response.status === 'success' && response.data?.logs) {
        setLogs(response.data.logs);
      }
    } catch (error) {
      console.error("Failed to fetch logs:", error);
      toast({ title: "Error", description: "Failed to load logs", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-100px)]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
            <FileText className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Activity Logs</h1>
        </div>
        <Badge variant="outline">{logs.length} entries</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-sm">{log.user_id || 'System'}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-medium bg-secondary/50">
                      {log.action.replace(/_/g, ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground font-mono">
                    {log.details ? JSON.stringify(log.details) : '-'}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(log.created_at).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
              {logs.length === 0 && (
                  <TableRow>
                      <TableCell colSpan={4} className="text-center py-12 text-muted-foreground">
                          No activity logs found.
                      </TableCell>
                  </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

import { useState } from "react";
import { CircleDollarSign, Clock, TrendingUp, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageWrapper, PageSection } from "@/components/PageWrapper";
import { Badge } from "@/components/ui/badge";
import { SwipeableDialog } from "@/components/SwipeableDialog";

interface ActivityItem {
  roomId: string;
  status: "inProcess" | "pending" | "paid";
  paidOn?: string;
  endTime: string;
  earnings: string;
  duration: number;
  quality: number;
  notes: string;
}

const formatDuration = (minutes: number): string => {
  if (minutes === 0) return "0m";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
};

const ACTIVITY_DATA: ActivityItem[] = [
  {
    roomId: "R-4829",
    status: "paid",
    paidOn: "11/28",
    endTime: "3:45 PM",
    earnings: "$12.50",
    duration: 45,
    quality: 82,
    notes:
      "Great conversation about skincare routines and product recommendations. Participant was engaged and asked thoughtful follow-up questions.",
  },
  {
    roomId: "R-4801",
    status: "inProcess",
    endTime: "2:20 PM",
    earnings: "In Process",
    duration: 0,
    quality: 0,
    notes: "In Process",
  },
  {
    roomId: "R-4786",
    status: "pending",
    endTime: "11:30 AM",
    earnings: "$10.00",
    duration: 38,
    quality: 76,
    notes:
      "Casual chat about relationship dynamics. Good conversation flow but could have been more in-depth.",
  },
  {
    roomId: "R-4762",
    status: "inProcess",
    endTime: "4:15 PM",
    earnings: "In Process",
    duration: 0,
    quality: 0,
    notes: "In Process",
  },
  {
    roomId: "R-4749",
    status: "paid",
    paidOn: "11/25",
    endTime: "6:45 PM",
    earnings: "$11.75",
    duration: 42,
    quality: 79,
    notes:
      "Book recommendations and literary discussion. Engaging conversation with some good insights.",
  },
];

const NOTIFICATIONS = [
  {
    id: 1,
    title: "New room invitation",
    description: "Sarah invited you to discuss travel stories",
    unread: true,
    time: "5 min ago",
  },
  {
    id: 2,
    title: "Payment received",
    description: "You earned $12.50 from your latest conversation",
    unread: true,
    time: "2 hours ago",
  },
  {
    id: 3,
    title: "Quality milestone",
    description: "Your average quality score reached 85%!",
    unread: false,
    time: "1 day ago",
  },
];

const Home = () => {
  const [activeTab, setActiveTab] = useState<"activity" | "notifications">(
    "activity"
  );
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(
    null
  );

  const getQualityColor = (quality: number) => {
    if (quality < 50) return "bg-red-500";
    if (quality < 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <PageWrapper fullWidth>
      <PageSection constrained>
        <div className="mb-6">
          <h2 className="text-xl font-medium tracking-tight mb-1.5">Home</h2>
          <p className="text-muted-foreground text-[13px]">
            Your calls, earnings, and quality at a glance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <Card className="border-border">
            <CardContent className="p-5 md:p-8">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-primary/[0.05] flex items-center justify-center">
                  <CircleDollarSign
                    className="w-4 h-4 md:w-5 md:h-5 text-primary"
                    strokeWidth={1.75}
                  />
                </div>
                <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-medium">
                  Total Earnings
                </p>
              </div>
              <p className="text-3xl md:text-4xl font-medium tracking-tight">
                $63.50
              </p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-5 md:p-8">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-primary/[0.05] flex items-center justify-center">
                  <Clock
                    className="w-4 h-4 md:w-5 md:h-5 text-primary"
                    strokeWidth={1.75}
                  />
                </div>
                <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-medium">
                  Total Time
                </p>
              </div>
              <p className="text-3xl md:text-4xl font-medium tracking-tight">
                3h 45m
              </p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-5 md:p-8">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-primary/[0.05] flex items-center justify-center">
                  <TrendingUp
                    className="w-4 h-4 md:w-5 md:h-5 text-primary"
                    strokeWidth={1.75}
                  />
                </div>
                <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-medium">
                  Avg Quality
                </p>
              </div>
              <p className="text-3xl md:text-4xl font-medium tracking-tight">
                83%
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="border-b border-border mb-6">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab("activity")}
              className={`
              pb-3 text-[13px] font-medium transition-all duration-200 relative
              ${
                activeTab === "activity"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground/70"
              }
            `}
            >
              Activity
              {activeTab === "activity" && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`
              pb-3 text-[13px] font-medium transition-all duration-200 relative flex items-center gap-2
              ${
                activeTab === "notifications"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground/70"
              }
            `}
            >
              Notifications
              {NOTIFICATIONS.filter((n) => n.unread).length > 0 && (
                <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1.5 rounded-full bg-primary text-primary-foreground text-[11px]">
                  {NOTIFICATIONS.filter((n) => n.unread).length}
                </span>
              )}
              {activeTab === "notifications" && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
              )}
            </button>
          </div>
        </div>

        {activeTab === "activity" && (
          <>
            <div className="hidden lg:block bg-card rounded-lg border border-border overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/10 border-b border-border">
                  <tr>
                    <th className="text-left py-4 px-6 text-[11px] text-muted-foreground uppercase tracking-wide font-medium">
                      Room ID
                    </th>
                    <th className="text-left py-4 px-6 text-[11px] text-muted-foreground uppercase tracking-wide font-medium">
                      Status
                    </th>
                    <th className="text-left py-4 px-6 text-[11px] text-muted-foreground uppercase tracking-wide font-medium">
                      End Time
                    </th>
                    <th className="text-left py-4 px-6 text-[11px] text-muted-foreground uppercase tracking-wide font-medium">
                      Earnings
                    </th>
                    <th className="text-left py-4 px-6 text-[11px] text-muted-foreground uppercase tracking-wide font-medium">
                      Duration
                    </th>
                    <th className="text-left py-4 px-6 text-[11px] text-muted-foreground uppercase tracking-wide font-medium">
                      Quality
                    </th>
                    <th className="text-left py-4 px-6 text-[11px] text-muted-foreground uppercase tracking-wide font-medium">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ACTIVITY_DATA.map((item, index) => (
                    <tr
                      key={index}
                      onClick={() => setSelectedActivity(item)}
                      className="border-t border-border hover:bg-muted/10 transition-all duration-200 cursor-pointer"
                    >
                      <td className="py-4 px-6 text-[13px] font-medium text-foreground">
                        {item.roomId}
                      </td>
                      <td className="py-4 px-6">
                        {item.status === "inProcess" ? (
                          <Badge className="bg-muted text-muted-foreground border-0 hover:bg-muted text-[11px] px-2.5 py-0.5">
                            In Process
                          </Badge>
                        ) : item.status === "pending" ? (
                          <Badge className="bg-blue-500/10 text-blue-600 border-0 hover:bg-blue-500/10 text-[11px] px-2.5 py-0.5">
                            Pending
                          </Badge>
                        ) : (
                          <Badge className="bg-green-500/10 text-green-600 border-0 hover:bg-green-500/10 text-[11px] px-2.5 py-0.5">
                            Paid on {item.paidOn}
                          </Badge>
                        )}
                      </td>
                      <td className="py-4 px-6 text-[13px] text-muted-foreground">
                        {item.endTime}
                      </td>
                      <td className="py-4 px-6">
                        {item.status === "inProcess" ? (
                          <Badge className="bg-muted text-muted-foreground border-0 hover:bg-muted text-[11px] px-2.5 py-0.5">
                            In Process
                          </Badge>
                        ) : (
                          <span className="text-[13px] font-medium text-foreground">
                            {item.earnings}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        {item.status === "inProcess" ? (
                          <Badge className="bg-muted text-muted-foreground border-0 hover:bg-muted text-[11px] px-2.5 py-0.5">
                            In Process
                          </Badge>
                        ) : (
                          <span className="text-[13px] text-muted-foreground">
                            {formatDuration(item.duration)}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        {item.status === "inProcess" ? (
                          <Badge className="bg-muted text-muted-foreground border-0 hover:bg-muted text-[11px] px-2.5 py-0.5">
                            In Process
                          </Badge>
                        ) : (
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-[6px] bg-muted/60 rounded-full overflow-hidden max-w-[120px]">
                              <div
                                className={`h-full ${getQualityColor(
                                  item.quality
                                )}`}
                                style={{ width: `${item.quality}%` }}
                              />
                            </div>
                            <span className="text-[13px] text-foreground font-medium w-10">
                              {item.quality}%
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        {item.status === "inProcess" ? (
                          <Badge className="bg-muted text-muted-foreground border-0 hover:bg-muted text-[11px] px-2.5 py-0.5">
                            In Process
                          </Badge>
                        ) : (
                          <span className="text-[13px] text-muted-foreground truncate max-w-[200px] block">
                            {item.notes}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="lg:hidden space-y-3">
              {ACTIVITY_DATA.map((item, index) => (
                <Card
                  key={index}
                  onClick={() => setSelectedActivity(item)}
                  className="border-border hover:bg-muted/10 cursor-pointer transition-all duration-200"
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-[15px] font-medium text-foreground">
                          {item.roomId}
                        </span>
                        {item.status === "inProcess" ? (
                          <Badge className="bg-muted text-muted-foreground border-0 text-[11px] px-2.5 py-0.5">
                            In Process
                          </Badge>
                        ) : item.status === "pending" ? (
                          <Badge className="bg-blue-500/10 text-blue-600 border-0 text-[11px] px-2.5 py-0.5">
                            Pending
                          </Badge>
                        ) : (
                          <Badge className="bg-green-500/10 text-green-600 border-0 text-[11px] px-2.5 py-0.5">
                            Paid {item.paidOn}
                          </Badge>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-[13px]">
                        <div>
                          <span className="text-muted-foreground">
                            End Time:
                          </span>
                          <span className="ml-1 text-foreground">
                            {item.endTime}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Earnings:
                          </span>
                          <span className="ml-1 font-medium text-foreground">
                            {item.earnings}
                          </span>
                        </div>
                        {item.status !== "inProcess" && (
                          <>
                            <div>
                              <span className="text-muted-foreground">
                                Duration:
                              </span>
                              <span className="ml-1 text-foreground">
                                {formatDuration(item.duration)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">
                                Quality:
                              </span>
                              <div className="flex items-center gap-2 flex-1">
                                <div className="flex-1 h-[4px] bg-muted/60 rounded-full overflow-hidden max-w-[60px]">
                                  <div
                                    className={`h-full ${getQualityColor(
                                      item.quality
                                    )}`}
                                    style={{ width: `${item.quality}%` }}
                                  />
                                </div>
                                <span className="text-foreground font-medium">
                                  {item.quality}%
                                </span>
                              </div>
                            </div>
                          </>
                        )}
                      </div>

                      {item.status !== "inProcess" && (
                        <p className="text-[13px] text-muted-foreground line-clamp-2 pt-1">
                          {item.notes}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {activeTab === "notifications" && (
          <div className="space-y-3">
            {NOTIFICATIONS.map((notification) => (
              <Card
                key={notification.id}
                className={`
                  border transition-all duration-200 cursor-pointer
                  ${
                    notification.unread
                      ? "border-primary/12 bg-primary/[0.015]"
                      : "border-border bg-card hover:bg-muted/15"
                  }
                `}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {notification.unread && (
                      <div className="w-[6px] h-[6px] rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-1">
                        <h3 className="text-[13px] font-medium text-foreground">
                          {notification.title}
                        </h3>
                        <span className="text-[12px] text-muted-foreground flex-shrink-0">
                          {notification.time}
                        </span>
                      </div>
                      <p className="text-[13px] text-muted-foreground leading-relaxed">
                        {notification.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </PageSection>

      <SwipeableDialog
        open={!!selectedActivity}
        onOpenChange={() => setSelectedActivity(null)}
        className="max-w-[calc(100vw-2rem)] sm:max-w-xl md:max-w-2xl bg-background border-border rounded-lg p-0 mx-4"
      >
        <div className="flex items-center justify-between px-5 md:px-8 py-5 md:py-6 border-b border-border">
          <h2 className="text-base md:text-lg font-medium tracking-tight">
            Room Details
          </h2>
          <button
            onClick={() => setSelectedActivity(null)}
            className="w-8 h-8 rounded-lg hover:bg-muted/50 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" strokeWidth={1.75} />
          </button>
        </div>

        {selectedActivity && (
          <div className="px-5 md:px-8 py-5 md:py-6 space-y-6 md:space-y-8 max-h-[70vh] overflow-y-auto">
            <div>
              <h3 className="text-[11px] text-muted-foreground uppercase tracking-wide font-medium mb-4">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1.5">
                    Room ID
                  </p>
                  <p className="text-[15px] font-medium text-foreground">
                    {selectedActivity.roomId}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1.5">
                    Status
                  </p>
                  <div>
                    {selectedActivity.status === "inProcess" ? (
                      <Badge className="bg-muted text-muted-foreground border-0 hover:bg-muted text-[11px] px-2.5 py-0.5">
                        In Process
                      </Badge>
                    ) : selectedActivity.status === "pending" ? (
                      <Badge className="bg-blue-500/10 text-blue-600 border-0 hover:bg-blue-500/10 text-[11px] px-2.5 py-0.5">
                        Pending
                      </Badge>
                    ) : (
                      <Badge className="bg-green-500/10 text-green-600 border-0 hover:bg-green-500/10 text-[11px] px-2.5 py-0.5">
                        Paid on {selectedActivity.paidOn}
                      </Badge>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1.5">
                    End Time
                  </p>
                  <p className="text-[15px] font-medium text-foreground">
                    {selectedActivity.endTime}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1.5">
                    Duration
                  </p>
                  {selectedActivity.status === "inProcess" ? (
                    <Badge className="bg-muted text-muted-foreground border-0 hover:bg-muted text-[11px] px-2.5 py-0.5">
                      In Process
                    </Badge>
                  ) : (
                    <p className="text-[15px] font-medium text-foreground">
                      {formatDuration(selectedActivity.duration)}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1.5">
                    Earnings
                  </p>
                  {selectedActivity.status === "inProcess" ? (
                    <Badge className="bg-muted text-muted-foreground border-0 hover:bg-muted text-[11px] px-2.5 py-0.5">
                      In Process
                    </Badge>
                  ) : (
                    <p className="text-[15px] font-medium text-foreground">
                      {selectedActivity.earnings}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1.5">
                    Quality
                  </p>
                  {selectedActivity.status === "inProcess" ? (
                    <Badge className="bg-muted text-muted-foreground border-0 hover:bg-muted text-[11px] px-2.5 py-0.5 mt-2">
                      In Process
                    </Badge>
                  ) : (
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex-1 h-[6px] bg-muted/60 rounded-full overflow-hidden max-w-[160px]">
                        <div
                          className={`h-full ${getQualityColor(
                            selectedActivity.quality
                          )}`}
                          style={{ width: `${selectedActivity.quality}%` }}
                        />
                      </div>
                      <span className="text-[15px] font-medium text-foreground">
                        {selectedActivity.quality}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-[11px] text-muted-foreground uppercase tracking-wide font-medium mb-3">
                Notes
              </h3>
              <div className="bg-muted/20 rounded-lg border border-border p-5">
                {selectedActivity.status === "inProcess" ? (
                  <Badge className="bg-muted text-muted-foreground border-0 hover:bg-muted text-[11px] px-2.5 py-0.5">
                    In Process
                  </Badge>
                ) : (
                  <p className="text-[13px] text-foreground leading-relaxed">
                    {selectedActivity.notes}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </SwipeableDialog>
    </PageWrapper>
  );
};

export default Home;

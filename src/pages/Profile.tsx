import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageWrapper, PageSection } from "@/components/PageWrapper";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const userData = {
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (415) 555-0123",
    dateOfBirth: "March 15, 1995",
    gender: "Female",
    city: "San Francisco",
    country: "United States",
    yearsInCity: "5 years",
    nativeLanguage: "English",
    dialect: "American English (General American)",
    languageFrequency: "Home/family, Work/school",
    proficiency: {
      speaking: 5,
      listening: 5,
      reading: 4,
      writing: 4,
    },
  };

  return (
    <PageWrapper fullWidth>
      <PageSection constrained>
        {/* Page Header */}
        <div className="mb-6">
          <h2 className="text-xl font-medium tracking-tight mb-1.5">Profile</h2>
          <p className="text-muted-foreground text-[13px]">
            Your account information and preferences.
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent p-0 h-auto mb-6 overflow-x-auto flex-nowrap">
            <TabsTrigger
              value="general"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-3 md:px-4 py-2.5 text-[12px] md:text-[13px] font-normal text-muted-foreground data-[state=active]:text-foreground whitespace-nowrap"
            >
              <span className="hidden sm:inline">General Information</span>
              <span className="sm:hidden">General</span>
            </TabsTrigger>
            <TabsTrigger
              value="language"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-3 md:px-4 py-2.5 text-[12px] md:text-[13px] font-normal text-muted-foreground data-[state=active]:text-foreground whitespace-nowrap"
            >
              <span className="hidden sm:inline">Language Overview</span>
              <span className="sm:hidden">Language</span>
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-3 md:px-4 py-2.5 text-[12px] md:text-[13px] font-normal text-muted-foreground data-[state=active]:text-foreground whitespace-nowrap"
            >
              <span className="hidden sm:inline">Account Settings</span>
              <span className="sm:hidden">Settings</span>
            </TabsTrigger>
            <TabsTrigger
              value="communication"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-3 md:px-4 py-2.5 text-[12px] md:text-[13px] font-normal text-muted-foreground data-[state=active]:text-foreground whitespace-nowrap"
            >
              <span className="hidden md:inline">
                Communication Preferences
              </span>
              <span className="md:hidden">Communication</span>
            </TabsTrigger>
          </TabsList>

          {/* General Information Tab */}
          <TabsContent value="general" className="mt-0">
            <div className="mb-4">
              <h3 className="text-[15px] font-medium tracking-tight mb-1">
                General Information
              </h3>
              <p className="text-muted-foreground text-[13px]">
                Your personal and contact details.
              </p>
            </div>

            <Card className="border-border">
              <CardContent className="p-6">
                {/* Identity Section */}
                <div className="mb-6">
                  <h4 className="text-[12px] font-medium text-muted-foreground uppercase tracking-wide mb-4">
                    Identity
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-16 gap-y-4">
                    <div>
                      <label className="text-[12px] font-normal text-muted-foreground block mb-1.5">
                        Full Name
                      </label>
                      <p className="text-[13px] text-foreground">
                        {userData.firstName} {userData.lastName}
                      </p>
                    </div>

                    <div>
                      <label className="text-[12px] font-normal text-muted-foreground block mb-1.5">
                        Date of Birth
                      </label>
                      <p className="text-[13px] text-foreground">
                        {userData.dateOfBirth}
                      </p>
                    </div>

                    <div>
                      <label className="text-[12px] font-normal text-muted-foreground block mb-1.5">
                        Gender
                      </label>
                      <p className="text-[13px] text-foreground">
                        {userData.gender}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-border mb-6" />

                {/* Contact Section */}
                <div className="mb-6">
                  <h4 className="text-[12px] font-medium text-muted-foreground uppercase tracking-wide mb-4">
                    Contact
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-16 gap-y-4">
                    <div>
                      <label className="text-[12px] font-normal text-muted-foreground block mb-1.5">
                        Email
                      </label>
                      <p className="text-[13px] text-foreground">
                        {userData.email}
                      </p>
                    </div>

                    <div>
                      <label className="text-[12px] font-normal text-muted-foreground block mb-1.5">
                        Phone Number
                      </label>
                      <p className="text-[13px] text-foreground">
                        {userData.phone}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-border mb-6" />

                {/* Location Section */}
                <div>
                  <h4 className="text-[12px] font-medium text-muted-foreground uppercase tracking-wide mb-4">
                    Location
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-16 gap-y-4">
                    <div>
                      <label className="text-[12px] font-normal text-muted-foreground block mb-1.5">
                        City
                      </label>
                      <p className="text-[13px] text-foreground">
                        {userData.city}
                      </p>
                    </div>

                    <div>
                      <label className="text-[12px] font-normal text-muted-foreground block mb-1.5">
                        Country
                      </label>
                      <p className="text-[13px] text-foreground">
                        {userData.country}
                      </p>
                    </div>

                    <div>
                      <label className="text-[12px] font-normal text-muted-foreground block mb-1.5">
                        Years Lived Here
                      </label>
                      <p className="text-[13px] text-foreground">
                        {userData.yearsInCity}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Language Overview Tab */}
          <TabsContent value="language" className="mt-0">
            <div className="mb-4">
              <h3 className="text-[15px] font-medium tracking-tight mb-1">
                Language Overview
              </h3>
              <p className="text-muted-foreground text-[13px]">
                Your language details and proficiency levels.
              </p>
            </div>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Primary Language */}
                  <div>
                    <label className="text-[12px] font-normal text-muted-foreground block mb-1.5">
                      Primary (Native) Language
                    </label>
                    <p className="text-[13px] text-foreground font-medium">
                      {userData.nativeLanguage}
                    </p>
                  </div>

                  <div className="h-px bg-border" />

                  {/* Dialect */}
                  <div>
                    <label className="text-[12px] font-normal text-muted-foreground block mb-1.5">
                      Dialect
                    </label>
                    <p className="text-[13px] text-foreground">
                      {userData.dialect}
                    </p>
                  </div>

                  <div className="h-px bg-border" />

                  {/* Frequency of Use */}
                  <div>
                    <label className="text-[12px] font-normal text-muted-foreground block mb-1.5">
                      Frequency of Use
                    </label>
                    <p className="text-[13px] text-foreground">
                      {userData.languageFrequency}
                    </p>
                  </div>

                  <div className="h-px bg-border" />

                  <div>
                    <label className="text-[12px] font-normal text-muted-foreground block mb-3">
                      Proficiency
                    </label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] text-foreground">
                          Speaking
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-1.5 bg-border rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary"
                              style={{
                                width: `${
                                  (userData.proficiency.speaking / 5) * 100
                                }%`,
                              }}
                            />
                          </div>
                          <span className="text-[12px] text-muted-foreground w-8 text-right">
                            {userData.proficiency.speaking}/5
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[13px] text-foreground">
                          Listening
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-1.5 bg-border rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary"
                              style={{
                                width: `${
                                  (userData.proficiency.listening / 5) * 100
                                }%`,
                              }}
                            />
                          </div>
                          <span className="text-[12px] text-muted-foreground w-8 text-right">
                            {userData.proficiency.listening}/5
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[13px] text-foreground">
                          Reading
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-1.5 bg-border rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary"
                              style={{
                                width: `${
                                  (userData.proficiency.reading / 5) * 100
                                }%`,
                              }}
                            />
                          </div>
                          <span className="text-[12px] text-muted-foreground w-8 text-right">
                            {userData.proficiency.reading}/5
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[13px] text-foreground">
                          Writing
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-1.5 bg-border rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary"
                              style={{
                                width: `${
                                  (userData.proficiency.writing / 5) * 100
                                }%`,
                              }}
                            />
                          </div>
                          <span className="text-[12px] text-muted-foreground w-8 text-right">
                            {userData.proficiency.writing}/5
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-0">
            <div className="mb-4">
              <h3 className="text-[15px] font-medium tracking-tight mb-1">
                Account Settings
              </h3>
              <p className="text-muted-foreground text-[13px]">
                Manage your account security and preferences.
              </p>
            </div>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <label className="text-[12px] font-normal text-muted-foreground block mb-1.5">
                      Email Address
                    </label>
                    <p className="text-[13px] text-foreground mb-3">
                      {userData.email}
                    </p>
                    <Button variant="outline" className="h-9 px-4 text-[13px]">
                      Change Email
                    </Button>
                  </div>

                  <div className="h-px bg-border" />

                  <div>
                    <label className="text-[12px] font-normal text-muted-foreground block mb-1.5">
                      Phone Number
                    </label>
                    <p className="text-[13px] text-foreground mb-3">
                      {userData.phone}
                    </p>
                    <Button variant="outline" className="h-9 px-4 text-[13px]">
                      Change Phone
                    </Button>
                  </div>

                  <div className="h-px bg-border" />

                  <div>
                    <label className="text-[12px] font-normal text-muted-foreground block mb-1.5">
                      Password
                    </label>
                    <p className="text-[13px] text-muted-foreground mb-3">
                      ••••••••
                    </p>
                    <Button variant="outline" className="h-9 px-4 text-[13px]">
                      Change Password
                    </Button>
                  </div>

                  <div className="h-px bg-border" />

                  <div>
                    <Button
                      className="h-9 px-4 text-[13px]"
                      onClick={() => navigate("/login")}
                    >
                      Log Out
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="communication" className="mt-0">
            <div className="mb-4">
              <h3 className="text-[15px] font-medium tracking-tight mb-1">
                Communication Preferences
              </h3>
              <p className="text-muted-foreground text-[13px]">
                Manage how you receive updates and notifications.
              </p>
            </div>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-[13px] text-foreground block mb-1">
                        App Reminders
                      </label>
                      <p className="text-[12px] text-muted-foreground">
                        Receive reminders for scheduled conversations
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="h-px bg-border" />

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-[13px] text-foreground block mb-1">
                        Earnings Updates
                      </label>
                      <p className="text-[12px] text-muted-foreground">
                        Get notified when you receive payments
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="h-px bg-border" />

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-[13px] text-foreground block mb-1">
                        Room Activity
                      </label>
                      <p className="text-[12px] text-muted-foreground">
                        Notifications when someone joins your room
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="h-px bg-border" />

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-[13px] text-foreground block mb-1">
                        New Feature Announcements
                      </label>
                      <p className="text-[12px] text-muted-foreground">
                        Stay updated with new features and improvements
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </PageSection>
    </PageWrapper>
  );
};

export default Profile;

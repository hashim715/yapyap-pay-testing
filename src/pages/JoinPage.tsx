import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import useAxios from "@/utils/useAxios";
import { toast } from "@/hooks/use-toast";

const JoinPage = () => {
  const navigate = useNavigate();
  const { meetingName, roomPasscode } = useParams();
  const baseURL = useSelector((state: RootState) => state.baseUrl.url);
  const api = useAxios();

  const createParticipantMeeting = async () => {
    try {
      const response = await api.post(
        `${baseURL}/v1/zoom/meeting/joinMeeting/`,
        {
          sessionName: meetingName,
          passcode: roomPasscode,
        },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating meeting:", error);
      toast({
        title: `${
          error.response.data.message ||
          "Failed to join meeting. Please try again."
        }`,
        variant: "destructive",
      });
      return null;
    }
  };

  useEffect(() => {
    const autoJoin = async () => {
      try {
        if (!roomPasscode || !meetingName) {
          navigate("/");
          return;
        }
        const data = await createParticipantMeeting();

        if (data === null) {
          navigate("/");
          return;
        }
        navigate(
          `/room/${encodeURIComponent(meetingName)}/${encodeURIComponent(
            roomPasscode
          )}`
        );
      } catch (error) {
        console.error("Error auto-joining room:", error);
        toast({
          title: `${
            error.response.data.message ||
            "Failed to join meeting. Please try again."
          }`,
          variant: "destructive",
        });
        navigate("/");
      }
    };
    autoJoin();
  }, [roomPasscode, meetingName]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-xl font-semibold text-foreground">
          Processing wait...
        </p>
      </div>
    </div>
  );
};

export default JoinPage;

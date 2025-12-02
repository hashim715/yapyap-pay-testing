import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import useAxios from "@/utils/useAxios";

const JoinPage = () => {
  const navigate = useNavigate();
  const { meetingName, roomPasscode } = useParams();
  const { user } = useAuth();
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
    } catch (error) {
      console.error("Error creating meeting:", error);
      navigate("/");
    }
  };

  useEffect(() => {
    const autoJoin = async () => {
      try {
        if (!roomPasscode || !user || !meetingName) {
          console.error("Missing required data for auto-join");
          navigate("/");
          return;
        }
        await createParticipantMeeting();
        navigate(
          `/room/${encodeURIComponent(meetingName)}/${encodeURIComponent(
            roomPasscode
          )}`
        );
      } catch (error) {
        console.error("Error auto-joining room:", error);
        navigate("/");
      }
    };
    autoJoin();
  }, [roomPasscode, user, meetingName, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-xl font-semibold text-foreground">
          Joining meeting...
        </p>
        <p className="text-sm text-muted-foreground mt-2">{meetingName}</p>
      </div>
    </div>
  );
};

export default JoinPage;

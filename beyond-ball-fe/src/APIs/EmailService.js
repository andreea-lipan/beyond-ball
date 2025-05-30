import { RequestInstance } from "./RequestInstance";
import { EMAIL_ENDPOINTS } from "./Endpoints";

const sendEmail = ({email, username, password}) => {
    return RequestInstance.post(EMAIL_ENDPOINTS.EMAIL_SEND, {
        email,
        username,
        password
    }).then(resp => resp.data)
}

const resendEmail = async ({ email, username, password }) => {
    try {
        const response = await RequestInstance.post(EMAIL_ENDPOINTS.EMAIL_RESEND, {
            email,
            username,
            password
        });

        return response.data;
    } catch (error) {
        const message =
            error.response?.data?.message ||
            error.response?.data?.error ||
            "Failed to resend email.";
        throw new Error(message);
    }
};

const EmailService = {
    resendEmail,
    sendEmail
};

export default EmailService;

package diss.beyondballbe.services.impl;

import diss.beyondballbe.model.accounts.UserAccount;
import diss.beyondballbe.persistence.UserAccountRepository;
import diss.beyondballbe.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UserAccountRepository userAccountRepository;

    public boolean sendCredentials(UserAccount user) {
        try {
            UserAccount userAccount = userAccountRepository.findUserByUsername(user.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(userAccount.getEmail());
            message.setSubject("Your Account Credentials");
            message.setText("Username: " + userAccount.getUsername() + "\nPassword: " + userAccount.getPassword());
            System.out.println(message);
            mailSender.send(message);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}

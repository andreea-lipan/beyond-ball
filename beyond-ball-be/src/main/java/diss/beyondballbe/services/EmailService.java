package diss.beyondballbe.services;

import diss.beyondballbe.model.accounts.UserAccount;

public interface EmailService {
    boolean sendCredentials(UserAccount user);
}

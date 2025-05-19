package diss.beyondballbe.services;

import diss.beyondballbe.model.accounts.UserAccount;

public interface EmailService {
    public boolean sendCredentials(UserAccount user);
}

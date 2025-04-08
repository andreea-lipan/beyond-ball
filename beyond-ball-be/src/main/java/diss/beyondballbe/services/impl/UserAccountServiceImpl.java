package diss.beyondballbe.services.impl;

import diss.beyondballbe.model.accounts.UserAccount;
import diss.beyondballbe.persistence.UserAccountRepository;
import diss.beyondballbe.services.UserAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserAccountServiceImpl implements UserAccountService {

    @Autowired
    private UserAccountRepository userAccountRepository;

    @Override
    public List<UserAccount> getAllAccounts() {
        return userAccountRepository.findAll();
    }
}

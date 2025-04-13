package diss.beyondballbe.services.impl;

import diss.beyondballbe.model.accounts.UserAccount;
import diss.beyondballbe.persistence.UserAccountRepository;
import diss.beyondballbe.services.UserAccountService;
import jakarta.persistence.EntityNotFoundException;
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

    @Override
    public UserAccount getAccountById(Long id) {
        return userAccountRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));
    }
}

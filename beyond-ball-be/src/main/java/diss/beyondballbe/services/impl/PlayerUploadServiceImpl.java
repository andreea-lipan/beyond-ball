package diss.beyondballbe.services.impl;

import diss.beyondballbe.model.accounts.PlayerAccount;
import diss.beyondballbe.model.accounts.PlayerStats;
import diss.beyondballbe.persistence.PlayerAccountRepository;
import diss.beyondballbe.persistence.UserAccountRepository;
import diss.beyondballbe.services.PlayerUploadService;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.util.Optional;

@Service
public class PlayerUploadServiceImpl implements PlayerUploadService {

    @Autowired
    private UserAccountRepository userAccountRepository;

    @Autowired
    private PlayerAccountRepository playerAccountRepository;

    @Override
    public void uploadPlayerStats(MultipartFile file, Long teamId) throws IOException {

        try (InputStream is = file.getInputStream();
             Workbook workbook = new XSSFWorkbook(is)) {
            Sheet sheet = workbook.getSheetAt(0);
            for (Row row : sheet) {
                if (row.getRowNum() == 0) continue;

                String firstName = row.getCell(0).getStringCellValue();
                String lastName = row.getCell(1).getStringCellValue();

                Optional<PlayerAccount> match = playerAccountRepository.findByFirstnameAndLastnameAndTeamId(firstName, lastName, teamId);
                if (match.isEmpty()) continue;

                PlayerAccount player = match.get();

                Cell dobCell = row.getCell(7);
                LocalDate dob;

                if (dobCell.getCellType() == CellType.NUMERIC && DateUtil.isCellDateFormatted(dobCell)) {
                    dob = dobCell.getLocalDateTimeCellValue().toLocalDate();
                } else if (dobCell.getCellType() == CellType.STRING) {
                    dob = LocalDate.parse(dobCell.getStringCellValue()); // assumes "yyyy-MM-dd"
                } else {
                    throw new IllegalArgumentException("Invalid date of birth format in Excel row " + row.getRowNum());
                }

                PlayerStats stats = new PlayerStats(
                        (int) row.getCell(2).getNumericCellValue(), // goals
                        (int) row.getCell(3).getNumericCellValue(), // assists
                        row.getCell(4).getNumericCellValue(),       // height
                        row.getCell(5).getNumericCellValue(),       // weight
                        row.getCell(6).getStringCellValue(),        // nationality
                        dob, // DOB
                        row.getCell(8).getStringCellValue()         // position
                );

                player.setStats(stats);
                userAccountRepository.save(player);
            }
        }
    }
}


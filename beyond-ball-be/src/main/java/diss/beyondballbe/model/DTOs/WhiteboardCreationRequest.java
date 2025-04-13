package diss.beyondballbe.model.DTOs;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WhiteboardCreationRequest {
    private String title;
    private Long player;

    public WhiteboardCreationRequest(String metadata){
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            WhiteboardCreationRequest request = objectMapper.readValue(metadata, WhiteboardCreationRequest.class);
            this.title = request.getTitle();
            this.player = request.getPlayer();
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse metadata", e);
        }
    }
}

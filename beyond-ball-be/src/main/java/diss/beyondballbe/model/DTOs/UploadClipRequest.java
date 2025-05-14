package diss.beyondballbe.model.DTOs;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UploadClipRequest {

    private String title;
    private Long player;
    private Long folderId;

    public UploadClipRequest(String metadata){
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            UploadClipRequest request = objectMapper.readValue(metadata, UploadClipRequest.class);
            this.title = request.getTitle();
            this.player = request.getPlayer();
            this.folderId = request.getFolderId();
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse metadata", e);
        }
    }
}

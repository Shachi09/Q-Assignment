package com.painting.ecart.controller;

import com.painting.ecart.entity.ApiResponse;
import com.painting.ecart.entity.Paintings;
import com.painting.ecart.repo.PaintingsRepository;

import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/paintings")
@CrossOrigin(origins = "http://localhost:8080, http://localhost:5173" )
@Slf4j
public class PaintingsController {
     private final PaintingsRepository paintingsRepository;

    public PaintingsController(PaintingsRepository paintingsRepository) {
        this.paintingsRepository = paintingsRepository;
    }

    @GetMapping
      public ResponseEntity<ApiResponse<List<Paintings>>> getAllPaintings() {
        List<Paintings> paintings = paintingsRepository.findAll();
        ApiResponse<List<Paintings>> response = new ApiResponse<>(
                "Candidate list retrieved successfully",
                200,
                paintings,
                200
        );
        return ResponseEntity.ok(response);
    }   

    @GetMapping("/{id}")
    // public Paintings getPaintingById(@PathVariable Long id) {
    //     return paintingsRepository.findById(id).orElse(null);
    // }
    public ResponseEntity<Map<String, Object>> getPaintingById(@PathVariable Long id) {
    Optional<Paintings> painting = paintingsRepository.findById(id);

    Map<String, Object> response = new HashMap<>();

    if (painting.isPresent()) {
        response.put("message", "Painting retrieved successfully");
        response.put("status_code", 200);
        Paintings paintingObject = painting.get();
        System.out.println(paintingObject);
        response.put("res", paintingObject);
        // response.put("res", painting.get());        
        response.put("status", 200);
        return ResponseEntity.ok(response);
    } else {
        response.put("message", "Painting not found");
        response.put("status_code", 404);
        response.put("res", null);
        response.put("status", 404);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }
}

     @PostMapping
    public ResponseEntity<ApiResponse<Paintings>> createPaintings(@RequestBody Paintings paintings) {
        log.info("Paintings: {}", paintings);
        
        Paintings savedPainting = paintingsRepository.save(paintings);

        ApiResponse<Paintings> response = new ApiResponse<>(
                "Painting created successfully",
                200,
                savedPainting,
                200
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Paintings>> updatePainting(@PathVariable Long id, @RequestBody Paintings updatedPainting) {
        Optional<Paintings> optionalPainting = paintingsRepository.findById(id);

        if (optionalPainting.isPresent()) {
            Paintings painting = optionalPainting.get();
            painting.setName(updatedPainting.getName());
            painting.setDimensions(updatedPainting.getDimensions());
            painting.setImage(updatedPainting.getImage());
            painting.setMaterial(updatedPainting.getMaterial());
            painting.setPrice(updatedPainting.getPrice());
            painting.setKeyword(updatedPainting.getKeyword());

            Paintings savedPainting = paintingsRepository.save(painting);

            ApiResponse<Paintings> response = new ApiResponse<>(
                    "Painting updated successfully",
                    200,
                    savedPainting,
                    200
            );

            return ResponseEntity.ok(response);
        } else {
            ApiResponse<Paintings> errorResponse = new ApiResponse<>(
                    "Painting not found",
                    404,
                    null,
                    404
            );

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }

    @DeleteMapping("/{id}")
    // public void deletePainting(@PathVariable Long id) {
    //     paintingsRepository.deleteById(id);
    // }
    public ResponseEntity<ApiResponse<String>> deletePainting(@PathVariable Long id) {
        Optional<Paintings> optionalPainting = paintingsRepository.findById(id);

        if (optionalPainting.isPresent()) {
            paintingsRepository.deleteById(id);

            ApiResponse<String> response = new ApiResponse<>(
                    "Painting deleted successfully",
                    200,
                    null,
                    200
            );

            return ResponseEntity.ok(response);
        } else {
            ApiResponse<String> errorResponse = new ApiResponse<>(
                    "Painting not found",
                    404,
                    null,
                    404
            );

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }
    
}

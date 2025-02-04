package com.painting.ecart.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.painting.ecart.entity.Paintings;

public interface PaintingsRepository extends JpaRepository<Paintings, Long> {
    
}

package br.com.schoolify.shoolify.controller;

import br.com.schoolify.shoolify.dto.SugestaoLivroDTO;
import br.com.schoolify.shoolify.services.SugestaoLivroService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/sugestoesLivros")
public class SugestaoLivroController {

    @Autowired
    private SugestaoLivroService service;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping(value = "/{id}")
    public ResponseEntity<SugestaoLivroDTO> findById(@PathVariable Long id) {
        SugestaoLivroDTO dto = service.findById(id);
        return ResponseEntity.ok(dto);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public ResponseEntity<Page<SugestaoLivroDTO>> findAll(Pageable pageable) {
        Page<SugestaoLivroDTO> dto = service.findAll(pageable);
        return ResponseEntity.ok(dto);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public ResponseEntity<SugestaoLivroDTO> insert(@Valid @RequestBody SugestaoLivroDTO dto) {
        dto = service.insert(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(dto.getId()).toUri();
        return ResponseEntity.created(uri).body(dto);
    }


    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PutMapping(value = "/{id}")
    public ResponseEntity<SugestaoLivroDTO> update(@PathVariable Long id, @Valid @RequestBody SugestaoLivroDTO dto) {
        dto = service.update(id, dto);
        return ResponseEntity.ok(dto);
    }


    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
package br.com.schoolify.shoolify.repository;

import br.com.schoolify.shoolify.model.Disciplina;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DisciplinaRepository extends JpaRepository<Disciplina, Long> {
}
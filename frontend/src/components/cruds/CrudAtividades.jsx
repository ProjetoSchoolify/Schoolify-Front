import styles from "@/styles/Cruds.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function CrudsAtividades() {
    return (
        <div className={styles.atividadeContainer}>
            <div className={styles.atividadeForm}>
                <form>
                    <div className={styles.formHeader}>
                        <h1>Registrar Atividade</h1>
                    </div>
                    <div className={styles.formGroupContainer}>
                        <div className={styles.formGroup}>
                            <label for="turma">Turma</label>
                            <select id="turma">
                                <option value="">Selecione uma turma</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label for="disciplina">Disciplina</label>
                            <select id="disciplina">
                                <option value="">Selecione uma disciplina</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label for="dataInicio">Data de início</label>
                            <input type="date" id="dataInicio" />
                        </div>
                        <div className={styles.formGroup}>
                            <label for="dataEntrega">Data de entrega</label>
                            <input type="date" id="dataEntrega" />
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label for="assunto">Assunto</label>
                        <input type="text" id="assunto" placeholder="Digite o assunto aqui..." />
                    </div>
                    <div className={styles.formDesc}>
                        <label for="descricao">Descrição</label>
                        <textarea id="descricao" placeholder="Digite a descrição aqui..."></textarea>
                    </div>
                    <button type="submit" className={styles.confirmButton}>CONFIRMAR</button>
                    <button type="button" className={styles.cancelButton} onClick={() => { }}>CANCELAR</button>
                </form>
            </div>
            <div className={styles.atividadeList}>
                <h1>Atividades Registradas</h1>
            </div>
        </div>
    );
}

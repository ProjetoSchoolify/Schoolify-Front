import styles from "@/styles/Cruds.module.css";
import { faGraduationCap, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Turmas() {
    const [turmas, setTurmas] = useState([
        { id: 1, serie: 4, nome: "Turma A" },
        { id: 2, serie: 4, nome: "Turma B" }
    ]);
    const [descricao, setDescricao] = useState("");
    const [serie, setSerie] = useState("");
    const [editandoId, setEditandoId] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (descricao.trim() === "" || serie.trim() === "") return;

        if (editandoId !== null) {
            setTurmas(turmas.map(turma => turma.id === editandoId ? { ...turma, nome: descricao, serie: serie } : turma));
            setEditandoId(null);
        } else {
            const novaTurma = {
                id: turmas.length + 1,
                serie: serie,
                nome: descricao
            };
            setTurmas([...turmas, novaTurma]);
        }

        setDescricao("");
        setSerie("");
    };

    const handleEdit = (id) => {
        const turma = turmas.find(t => t.id === id);
        setDescricao(turma.nome);
        setSerie(turma.serie);
        setEditandoId(id);
    };

    const handleDelete = (id) => {
        setTurmas(turmas.filter(turma => turma.id !== id));
    };

    return (
        <div className={styles.containerCruds}>
            <div className={styles.containerForm}>
                <FontAwesomeIcon icon={faGraduationCap} className={styles.iconForms} />
                <form onSubmit={handleSubmit}>
                    <div className={styles.formHeader}>
                        <h1>{editandoId !== null ? "Editar Turma" : "Registrar Turma"}</h1>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="serie">Série</label>
                        <input
                            type="text"
                            id="serie"
                            placeholder="Digite a série..."
                            value={serie}
                            onChange={(e) => setSerie(e.target.value)}
                        />
                    </div>
                    <div className={styles.formDesc}>
                        <label htmlFor="descricao">Descrição</label>
                        <textarea
                            id="descricao"
                            placeholder="Digite a descrição aqui..."
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        ></textarea>
                    </div>
                    <button type="submit" className={styles.submitButton}>
                        {editandoId !== null ? "Salvar Alterações" : "Registrar"}
                    </button>
                </form>
            </div>

            <div className={styles.containerList}>
                <h1>Turmas</h1>
                <ul className={styles.listaList}>
                    {turmas.map((turma) => (
                        <li key={turma.id} className={styles.listaItem}>
                            <div>
                                <strong>Série:</strong> {turma.serie} <br />
                                <strong>Turma:</strong> {turma.nome}
                            </div>
                            <div className={styles.actionButtons}>
                                <button onClick={() => handleEdit(turma.id)} className={styles.editButton}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button onClick={() => handleDelete(turma.id)} className={styles.deleteButton}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}


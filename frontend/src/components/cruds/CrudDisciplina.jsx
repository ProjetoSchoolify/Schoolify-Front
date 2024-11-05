import styles from "@/styles/Cruds.module.css";
import { faScroll, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function CrudDisciplina() {
    const [disciplinas, setDisciplinas] = useState([
        {
            id: 1,
            nome: 'Matemática',
            imgUrl: 'https://static.vecteezy.com/ti/vetor-gratis/p1/20277225-matematica-rabisco-definir-educacao-e-estude-conceito-escola-equipamento-matematicas-formulas-dentro-esboco-estilo-mao-desenhado-ector-ilustracao-isolado-em-branco-fundo-vetor.jpg',
        },
        {
            id: 2,
            nome: 'História',
            imgUrl: 'https://static.vecteezy.com/system/resources/thumbnails/002/236/242/small_2x/history-minimal-thin-line-icons-set-vector.jpg',
        },
    ]);
    const [nomeDisciplina, setNomeDisciplina] = useState("");
    const [imagemUrl, setImagemUrl] = useState("");
    const [editandoId, setEditandoId] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (nomeDisciplina.trim() === "" || imagemUrl.trim() === "") return;

        if (editandoId !== null) {
            setDisciplinas(disciplinas.map(disciplina =>
                disciplina.id === editandoId
                    ? { ...disciplina, nome: nomeDisciplina, imgUrl: imagemUrl }
                    : disciplina
            ));
            setEditandoId(null);
        } else {
            const novaDisciplina = {
                id: disciplinas.length + 1,
                nome: nomeDisciplina,
                imgUrl: imagemUrl
            };
            setDisciplinas([...disciplinas, novaDisciplina]);
        }

        setNomeDisciplina("");
        setImagemUrl("");
    };

    const handleEdit = (id) => {
        const disciplina = disciplinas.find(d => d.id === id);
        setNomeDisciplina(disciplina.nome);
        setImagemUrl(disciplina.imgUrl);
        setEditandoId(id);
    };

    const handleDelete = (id) => {
        setDisciplinas(disciplinas.filter(disciplina => disciplina.id !== id));
    };

    return (
        <div className={styles.containerCruds}>
            <div className={styles.containerForm}>
                <FontAwesomeIcon icon={faScroll} className={styles.iconForms} />
                <form onSubmit={handleSubmit}>
                    <div className={styles.formHeader}>
                        <h1>{editandoId !== null ? "Editar Disciplina" : "Registrar Disciplina"}</h1>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="nomeDisc">Disciplina</label>
                        <input
                            type="text"
                            id="nomeDisc"
                            name="nomeDisc"
                            placeholder="Digite o nome da disciplina..."
                            value={nomeDisciplina}
                            onChange={(e) => setNomeDisciplina(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="imagemUrl">URL da Imagem</label>
                        <input
                            type="text"
                            id="imagemUrl"
                            name="imagemUrl"
                            placeholder="Digite a URL da imagem..."
                            value={imagemUrl}
                            onChange={(e) => setImagemUrl(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.submitButton}>
                        {editandoId !== null ? "Salvar Alterações" : "Registrar"}
                    </button>
                </form>
            </div>
            <div className={styles.containerList}>
                <h1>Disciplinas</h1>
                <ul className={styles.listaList}>
                    {disciplinas.map((disciplina) => (
                        <li key={disciplina.id} className={styles.listaItem}>
                            <div>
                                <strong>Disciplina:</strong> {disciplina.nome} <br />
                                <img src={disciplina.imgUrl} alt={disciplina.nome} className={styles.imageList} />
                            </div>
                            <div className={styles.actionButtons}>
                                <button onClick={() => handleEdit(disciplina.id)} className={styles.editButton}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button onClick={() => handleDelete(disciplina.id)} className={styles.deleteButton}>
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


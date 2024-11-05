import styles from "@/styles/Cruds.module.css";
import { faBook, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Livros() {
    const [livros, setLivros] = useState([
        { id: 1, nome: "Dom Quixote", capa: "https://upload.wikimedia.org/wikipedia/pt/thumb/4/4e/Dom_Quixote_1655.jpg/220px-Dom_Quixote_1655.jpg", link: "https://linkparadomquixote.com" },
        { id: 2, nome: "1984", capa: "https://upload.wikimedia.org/wikipedia/pt/thumb/9/94/1984_Orwell.jpg/220px-1984_Orwell.jpg", link: "https://linkpara1984.com" }
    ]);
    const [nomeLivro, setNomeLivro] = useState("");
    const [capa, setCapa] = useState("");
    const [linkLivro, setLinkLivro] = useState("");
    const [editandoId, setEditandoId] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (nomeLivro.trim() === "" || capa.trim() === "" || linkLivro.trim() === "") return;

        if (editandoId !== null) {
            setLivros(livros.map((livro) =>
                livro.id === editandoId ? { ...livro, nome: nomeLivro, capa: capa, link: linkLivro } : livro
            ));
            setEditandoId(null);
        } else {
            const novoLivro = {
                id: livros.length + 1,
                nome: nomeLivro,
                capa: capa,
                link: linkLivro
            };
            setLivros([...livros, novoLivro]);
        }

        setNomeLivro("");
        setCapa("");
        setLinkLivro("");
    };

    const handleEdit = (id) => {
        const livro = livros.find((l) => l.id === id);
        setNomeLivro(livro.nome);
        setCapa(livro.capa);
        setLinkLivro(livro.link);
        setEditandoId(id);
    };

    const handleDelete = (id) => {
        setLivros(livros.filter((livro) => livro.id !== id));
    };

    return (
        <div className={styles.containerCruds}>
            <div className={styles.containerForm}>
                <FontAwesomeIcon icon={faBook} className={styles.iconForms} />
                <form onSubmit={handleSubmit}>
                    <div className={styles.formHeader}>
                        <h1>{editandoId !== null ? "Editar Livro" : "Registrar Livro"}</h1>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="nomeLivro">Nome do Livro</label>
                        <input
                            type="text"
                            id="nomeLivro"
                            name="nomeLivro"
                            placeholder="Digite o nome do livro..."
                            value={nomeLivro}
                            onChange={(e) => setNomeLivro(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="capa">Capa</label>
                        <input
                            type="url"
                            id="capa"
                            name="capa"
                            placeholder="Digite a URL da capa..."
                            value={capa}
                            onChange={(e) => setCapa(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="linkLivro">Link</label>
                        <input
                            type="url"
                            id="linkLivro"
                            name="linkLivro"
                            placeholder="Digite o link..."
                            value={linkLivro}
                            onChange={(e) => setLinkLivro(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.submitButton}>
                        {editandoId !== null ? "Salvar Alterações" : "Registrar"}
                    </button>
                </form>
            </div>
            <div className={styles.containerList}>
                <h1>Sugestões de Livros</h1>
                <ul className={styles.listaList}>
                    {livros.map((livro) => (
                        <li key={livro.id} className={styles.listaItem}>
                            <div>
                                <strong>Nome:</strong> {livro.nome} <br />
                                <strong>Capa:</strong> <br />
                                <img src={livro.capa} alt={`Capa de ${livro.nome}`} className={styles.imageList} /> <br />
                                <strong>Link:</strong> <a href={livro.link} target="_blank" rel="noopener noreferrer">{livro.link}</a>
                            </div>
                            <div className={styles.actionButtons}>
                                <button onClick={() => handleEdit(livro.id)} className={styles.editButton}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button onClick={() => handleDelete(livro.id)} className={styles.deleteButton}>
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



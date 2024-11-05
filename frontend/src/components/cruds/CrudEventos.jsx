import { useState } from "react";
import styles from "@/styles/Cruds.module.css";
import { faCalendarPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CrudEventos() {
    const [eventos, setEventos] = useState([
        { id: 1, nome: "Reunião de Pais", data: "2024-11-10", hora: "14:00", descricao: "Reunião com pais para discutir o desempenho dos alunos." },
        { id: 2, nome: "Festa de Encerramento", data: "2024-12-20", hora: "19:00", descricao: "Evento de encerramento do ano letivo." }
    ]);

    const [nome, setNome] = useState("");
    const [data, setData] = useState("");
    const [hora, setHora] = useState("");
    const [descricao, setDescricao] = useState("");
    const [editandoId, setEditandoId] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (nome.trim() === "" || data.trim() === "" || hora.trim() === "" || descricao.trim() === "") {
            alert("Preencha todos os campos.");
            return;
        }

        const novoEvento = {
            id: editandoId !== null ? editandoId : eventos.length + 1,
            nome,
            data,
            hora,
            descricao
        };

        setEventos(
            editandoId !== null
                ? eventos.map((evento) => (evento.id === editandoId ? novoEvento : evento))
                : [...eventos, novoEvento]
        );

        setEditandoId(null);
        setNome("");
        setData("");
        setHora("");
        setDescricao("");
    };

    const handleEdit = (id) => {
        const evento = eventos.find((e) => e.id === id);
        setNome(evento.nome);
        setData(evento.data);
        setHora(evento.hora);
        setDescricao(evento.descricao);
        setEditandoId(id);
    };

    const handleDelete = (id) => {
        setEventos(eventos.filter((evento) => evento.id !== id));
    };

    return (
        <div className={styles.containerCruds}>
            <div className={styles.containerForm}>
                <FontAwesomeIcon icon={faCalendarPlus} className={styles.iconForms} />
                <form onSubmit={handleSubmit}>
                    <div className={styles.formHeader}>
                        <h1>{editandoId !== null ? "Editar Evento" : "Registrar Evento"}</h1>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="nomeEvent">Nome</label>
                        <input
                            type="text"
                            id="nomeEvent"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="dataEvent">Data</label>
                        <input
                            type="date"
                            id="dataEvent"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="horaEvent">Hora</label>
                        <input
                            type="time"
                            id="horaEvent"
                            value={hora}
                            onChange={(e) => setHora(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formDesc}>
                        <label htmlFor="descricao">Descrição</label>
                        <textarea
                            id="descricao"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            placeholder="Digite a descrição aqui..."
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className={styles.submitButton}>
                        {editandoId !== null ? "Salvar Alterações" : "Registrar"}
                    </button>
                </form>
            </div>
            <div className={styles.containerList}>
                <h1>Lista de Eventos</h1>
                <ul className={styles.listaList}>
                    {eventos.map((evento) => (
                        <li key={evento.id} className={styles.listaItem}>
                            <div>
                                <strong>Nome:</strong> {evento.nome} <br />
                                <strong>Data:</strong> {evento.data} <br />
                                <strong>Hora:</strong> {evento.hora} <br />
                                <strong>Descrição:</strong> {evento.descricao}
                            </div>
                            <div className={styles.actionButtons}>
                                <button onClick={() => handleEdit(evento.id)} className={styles.editButton}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button onClick={() => handleDelete(evento.id)} className={styles.deleteButton}>
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



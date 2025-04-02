import React, { useState } from "react";
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
} from "react-native";
import { useMovieContext } from "@/context/MovieContext";

const ModalNotation = ({ visible, onClose, idMovie }) => {
    const [rating, setRating] = useState(-1);
    const [comment, setComment] = useState("");
    const { setCommentList, setRatingList } = useMovieContext();

    const handleSubmission = () => {
        if (rating !== -1) {
            setRatingList((prevList) => {
                const updatedList = prevList.map(item =>
                    item.id === idMovie ? { ...item, rating } : item
                );
                return updatedList.some(item => item.id === idMovie)
                    ? updatedList
                    : [...updatedList, { id: idMovie, rating }];
            });
        }

        if (comment.trim() !== "") {
            setCommentList((prevList) => {
                const updatedList = prevList.map(item =>
                    item.id === idMovie ? { ...item, comment } : item
                );
                return updatedList.some(item => item.id === idMovie)
                    ? updatedList
                    : [...updatedList, { id: idMovie, comment }];
            });
        }

        setRating(-1);
        setComment("");
        onClose();
    };

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Noter ce film</Text>

                    <View style={styles.starContainer}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <TouchableOpacity key={star} onPress={() => setRating(star)}>
                                <Text style={{ fontSize: 30, color: star <= rating ? "#FFD700" : "#B0B0B0" }}>★</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TextInput
                        style={styles.commentInput}
                        placeholder="Laissez un commentaire..."
                        placeholderTextColor="#999"
                        value={comment}
                        onChangeText={setComment}
                        multiline
                    />

                    <View style={styles.modalButtons}>
                        <TouchableOpacity onPress={onClose} style={styles.modalButton}>
                            <Text style={styles.buttonText}>Annuler</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSubmission} style={styles.modalButton}>
                            <Text style={styles.buttonText}>Envoyer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#1E1E1E',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    starContainer: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    commentInput: {
        backgroundColor: '#333',
        color: 'white',
        width: '100%',
        padding: 10,
        borderRadius: 8,
        marginVertical: 10,
        textAlignVertical: 'top',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default ModalNotation;

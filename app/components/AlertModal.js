import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

function AlertModal({ visible, onClose, content, severity }) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text
            style={[
              styles.title,
              { color: severity == "error" ? "#FD5765" : "#4CAF50" },
            ]}
          >
            {severity == "error" ? "Error Occurred!" : "Success!"}
          </Text>
          <Text style={styles.message}>{content}</Text>
          <View style={styles.buttonRow}>
            <Pressable
              style={[styles.button, styles.okButton]}
              onPress={onClose}
            >
              <Text style={styles.okText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  openButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  okButton: {
    backgroundColor: "#4CAF50",
  },
  okText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
export default AlertModal;

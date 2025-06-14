import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface ClubFilterProps {
  onSelectClub: (club: string | null) => void;
}

const ClubFilter: React.FC<ClubFilterProps> = ({ onSelectClub }) => {
  const [selectedClub, setSelectedClub] = useState<string | null>(null);

  const clubs = ["All Clubs", "GDSC", "AdroIT", "Actkrit"];

  const handleChange = (value: string) => {
    setSelectedClub(value === "All Clubs" ? null : value);
    onSelectClub(value === "All Clubs" ? null : value);
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedClub ?? "All Clubs"}
        onValueChange={handleChange}
        style={styles.picker}
      >
        {clubs.map((club) => (
          <Picker.Item key={club} label={club} value={club} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 5,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  picker: {
    height: 50,
    width: "100%",
  },
});

export default ClubFilter;

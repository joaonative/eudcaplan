import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Plan } from "../interfaces/Plan";

const PlanToPdf = ({ plan, title }: { plan: Plan; title: string }) => {
  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#E4E4E4",
      padding: 4,
      fontSize: "12px",
    },
    section: {
      marginBottom: 10,
    },
    table: {
      width: "100%",
      borderStyle: "solid",
      borderColor: plan.color,
      borderWidth: 1,
    },
    tableHeader: {
      backgroundColor: plan.color,
    },
    tableRow: {
      flexDirection: "row",
    },
    tableCell: {
      flexGrow: 1,
      flexBasis: "25%",
      borderStyle: "solid",
      borderColor: plan.color,
      borderWidth: 1,
      paddingVertical: 2,
      paddingHorizontal: 4,
      textAlign: "left",
      fontWeight: "medium",
    },
    developmentCell: {
      flexGrow: 1,
      flexBasis: "25%",
      borderStyle: "solid",
      borderColor: plan.color,
      borderWidth: 1,
      paddingVertical: 2,
      paddingHorizontal: 4,
      textAlign: "left",
      fontWeight: "medium",
      overflow: "hidden",
    },
  });

  return (
    <Document title={title}>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={[styles.table, styles.section]}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <View style={styles.tableCell}>
                <Text style={{ color: "#FFF" }}>Horário</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={{ color: "#FFF" }}>Atividade</Text>
              </View>
            </View>
            {plan.schedules.map((sch, index) => (
              <View style={[styles.tableRow]} key={index}>
                <View style={styles.tableCell}>
                  <Text>{sch.hour}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{sch.activity}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={[styles.table, styles.section]}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <View style={styles.tableCell}>
                <Text style={{ color: "#FFF" }}>Data</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={{ color: "#FFF" }}>Campos de Experiencia</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={{ color: "#FFF" }}>Objetivos de Aprendizagem</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={{ color: "#FFF" }}>Desenvolvimento</Text>
              </View>
            </View>
            {plan.details.map((dtl, index) => (
              <View style={[styles.tableRow]} key={index}>
                <View style={styles.tableCell}>
                  <Text>{dtl.day}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{dtl.experienceField}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{dtl.objectives}</Text>
                </View>
                <View style={styles.developmentCell}>
                  <Text>{dtl.development}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PlanToPdf;

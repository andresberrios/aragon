<template>
  <div>
    <b-container class="my-5">
      <h1>Sales</h1>
      <b-form class="mt-4">
        <b-form-group label="Tipo de Documento: ">
          <b-form-select
            label="Tipo de documento: "
            v-model="sale.selected"
            :options="options"
          ></b-form-select>
        </b-form-group>
        <b-form-group label="Número de Documento">
          <b-form-input
            v-model="sale.documentNum"
            placeholder="Ingrese el número de documento"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Número de Voucher">
          <b-form-input
            v-model="sale.voucherNum"
            placeholder="Ingrese el número de voucher"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Seleccione fecha">
          <b-form-datepicker
            v-model="sale.selectedDate"
            class="mb-2"
          ></b-form-datepicker>
        </b-form-group>
        <b-form-group label="Nombre del Cliente">
          <b-form-input
            v-model="sale.clientName"
            placeholder="Ingrese el nombre del cliente"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="RUT del Cliente">
          <b-form-input
            v-model="sale.clientRut"
            placeholder="Ingrese el RUT de cliente"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Venta Neta">
          <b-input-group size="md" prepend="$">
            <b-form-input
              v-model="sale.netSale"
              type="number"
              placeholder="Ingrese el valor de venta neta"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-group label="IVA">
          <b-input-group size="md" prepend="$">
            <b-form-input
              v-model="sale.tax"
              type="number"
              placeholder="Ingrese el valor del IVA"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-group label="Total Factura">
          <b-input-group size="md" prepend="$">
            <b-form-input
              v-model="sale.totalValue"
              type="number"
              placeholder="Ingrese el valor total de la factura"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
      </b-form>
      <pre class="bg-warning mt-5 p-4">{{ sale }}</pre>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sale: {
        documentNum: "",
        voucherNum: "",
        selectedType: null,
        selectedDate: "",
        clientName: "",
        clientRut: "",
        netSale: "",
        tax: "",
        totalValue: ""
      },
      options: [
        { value: null, text: "-- Please select an option --", disabled: true },
        { value: "voucher", text: "Voucher" },
        { value: "boleta", text: "Boleta" },
        { value: "factura-elect", text: "Factura Electronica" },
        {
          value: "factura-export-elect",
          text: "Factura Exportacion Electronica"
        },
        { value: "factura-export", text: "Factura Exportacion" },
        { value: "nota-credito-elect", text: "Nota de Credito Electronica" },
        { value: "nota-credito-export", text: "Nota de Credito Exportacion" }
      ]
    };
  }
};
</script>

<style></style>

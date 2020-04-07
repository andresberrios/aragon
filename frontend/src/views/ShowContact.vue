<template>
  <b-container class="my-5">
    <span class="lead font-weight-bold">Contacto:</span>
    <b-button
      class="float-right"
      variant="primary"
      :to="{ name: 'contacts.edit', params: { id } }"
    >
      <b-icon icon="pencil" />
      Editar
    </b-button>
    <div v-if="$apollo.queries.contact.loading">
      <b-spinner small /> Cargando...
    </div>
    <b-alert v-else-if="error" show variant="danger">
      {{ error.message }}
    </b-alert>
    <div v-else>
      <h1 class="mb-3 font-weight-light">
        {{ contact.name }} {{ contact.surname }}
      </h1>
      <hr />
      <dl>
        <dt>Tipo</dt>
        <dd>{{ contact.isPerson ? "Persona" : "Empresa" }}</dd>
        <dt>Nombre</dt>
        <dd>{{ contact.name }}</dd>
        <dt v-if="contact.isPerson">Apellidos</dt>
        <dd v-if="contact.isPerson">{{ contact.surname }}</dd>
        <dt>Tipo de documento de identidad</dt>
        <dd>{{ contact.idType }}</dd>
        <dt>Número de documento de identidad</dt>
        <dd>{{ contact.idNum }}</dd>
        <dt>Fecha de nacimiento</dt>
        <dd>{{ contact.birthDate }}</dd>
        <dt>Teléfono</dt>
        <dd>{{ contact.phone }}</dd>
        <dt>Email</dt>
        <dd>{{ contact.email }}</dd>
        <dt>Dirección</dt>
        <dd>
          {{ contact.address.line1 }}
          <br v-if="contact.address.line2" />
          {{ contact.address.line2 }}
        </dd>
        <dt>Ciudad</dt>
        <dd>{{ contact.address.city }}</dd>
        <dt>País</dt>
        <dd>{{ contact.address.country }}</dd>
      </dl>
    </div>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { GET_CONTACT } from "../queries/accounting";
import { Contact } from "../interfaces/accounting";

@Component({
  apollo: {
    contact: {
      query: GET_CONTACT,
      variables() {
        return { id: this.id };
      },
      error(e) {
        this.error = e;
      }
    }
  }
})
export default class EditProcedure extends Vue {
  @Prop({ required: true })
  id!: string;
  contact: Contact | null = null;
  error: Error | null = null;
}
</script>

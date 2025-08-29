<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['create-successful']);

const username = ref('');
const password = ref('');
const showPassword = ref(false);
const isLoading = ref(false);
const errors = ref<{ username?: string; password?: string[]; api?: string }>(
  {},
);

enum ErrorType {
  NOT_ALLOWED = 'not_allowed',
}
const ERROR_MESSAGES = {
  passwordTooShort: 'Password must be at least 10 characters long',
  passwordTooLong: 'Password must be at most 24 characters long',
  passwordNoSpaces: 'Password cannot contain spaces',
  passwordNeedsNumber: 'Password must contain at least one number',
  passwordNeedsUpper: 'Password must contain at least one uppercase letter',
  passwordNeedsLower: 'Password must contain at least one lowercase letter',
  apiUnauthorized: 'Not authenticated to access this resource.',
  apiNotAllowed:
    'Sorry, the entered password is not allowed, please try a different one.',
  apiServer: 'Something went wrong, please try again.',
};
const API_TOKEN = '';

function validatePassword(pw: string): string[] {
  const messages: string[] = [];

  if (pw.length < 10) messages.push(ERROR_MESSAGES.passwordTooShort);
  if (pw.length > 24) messages.push(ERROR_MESSAGES.passwordTooLong);
  if (/\s/.test(pw)) messages.push(ERROR_MESSAGES.passwordNoSpaces);
  if (!/\d/.test(pw)) messages.push(ERROR_MESSAGES.passwordNeedsNumber);
  if (!/[a-z]/.test(pw)) messages.push(ERROR_MESSAGES.passwordNeedsLower);
  if (!/[A-Z]/.test(pw)) messages.push(ERROR_MESSAGES.passwordNeedsUpper);

  return messages;
}

async function apiRequest<T>(
  route: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  body?: unknown,
): Promise<{ success: boolean; data?: T; error?: string }> {
  try {
    const res = await fetch(
      `https://api.challenge.hennge.com/password-validation-challenge-api/001${route}`,
      {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: body ? JSON.stringify(body) : undefined,
      },
    );

    if (res.ok) {
      return { success: true };
    } else if (res.status === 401 || res.status === 403) {
      return { success: false, error: ERROR_MESSAGES.apiUnauthorized };
    } else if (res.status === 422) {
      const data = await res.json();
      if (data.errors && data.errors.includes(ErrorType.NOT_ALLOWED)) {
        return { success: false, error: ERROR_MESSAGES.apiNotAllowed };
      }
    } else if (res.status === 500) {
      return { success: false, error: ERROR_MESSAGES.apiServer };
    }
    return { success: false, error: ERROR_MESSAGES.apiServer };
  } catch (err) {
    return { success: false, error: ERROR_MESSAGES.apiServer };
  }
}

async function handleSubmit(e: Event) {
  e.preventDefault();
  errors.value = {};

  const pwErrors = validatePassword(password.value);
  if (pwErrors.length > 0) {
    errors.value.password = pwErrors;
    return;
  }

  isLoading.value = true;
  const result = await apiRequest('/challenge-signup', 'POST', {
    username: username.value,
    password: password.value,
  });

  if (result.success) {
    emit('create-successful');
    username.value = '';
    password.value = '';
  } else {
    errors.value.api = result.error;
  }
  isLoading.value = false;
}
</script>

<template>
  <div class="form-wrapper">
    <div v-if="errors.api" class="api-error" role="alert">
      {{ errors.api }}
    </div>

    <form class="form" @submit="handleSubmit">
      <label for="username">Username</label>
      <input
        id="username"
        required
        v-model="username"
        type="text"
        :disabled="isLoading"
        @input="errors.username = undefined"
        :aria-invalid="!!errors.username"
        aria-describedby="username-error"
      />
      <p v-if="errors.username" id="username-error" role="alert" class="error">
        {{ errors.username }}
      </p>

      <label for="password">Password</label>
      <div class="password-wrapper">
        <input
          id="password"
          required
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          :disabled="isLoading"
          @input="errors.password = undefined"
          :aria-invalid="!!errors.password"
          aria-describedby="password-error"
        />
        <button
          type="button"
          class="toggle-button"
          :disabled="isLoading"
          @click="showPassword = !showPassword"
          :aria-label="showPassword ? 'Hide password' : 'Show password'"
        >
          {{ showPassword ? 'Hide' : 'Show' }}
        </button>
      </div>
      <ul
        v-if="errors.password"
        id="password-error"
        role="alert"
        class="error-list"
      >
        <li v-for="(err, i) in errors.password" :key="i">{{ err }}</li>
      </ul>

      <button class="submit-button" type="submit" :disabled="isLoading">
        <span v-if="isLoading" class="spinner"></span>
        {{ isLoading ? 'Creating...' : 'Create User' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.form-wrapper {
  max-width: 500px;
  width: 80%;
  background-color: #efeef5;
  padding: 24px;
  margin: auto;
  border-radius: 8px;
}

.form {
  display: flex;
  gap: 8px;
  flex-direction: column;
}

label {
  font-weight: 700;
}

input {
  outline: none;
  padding: 8px 16px;
  height: 40px;
  font-size: 14px;
  background-color: #f8f7fa;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
}

input:disabled {
  background-color: #e0e0e0;
  cursor: not-allowed;
}

.submit-button {
  outline: none;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background-color: #7135d2;
  color: white;
  font-size: 16px;
  font-weight: 500;
  height: 40px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  align-self: flex-end;
  cursor: pointer;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error {
  color: red;
  font-size: 0.9rem;
}

.error-list {
  color: red;
  font-size: 0.9rem;
  margin: 0.25rem 0 0 0;
  padding-left: 1.25rem;
}

.password-wrapper {
  position: relative;
  width: 100%;
}

.password-wrapper input {
  width: 100%;
  padding-right: 4rem;
  box-sizing: border-box;
}

.toggle-button {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 0.9rem;
  color: white;
  background-color: #b6b4b4;
  padding: 4px 8px;
  border-radius: 4px;
}

.api-error {
  color: #d8000c;
  background-color: #ffbaba7d;
  border: 2px solid #ff0000;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 4px;
  text-align: center;
  font-weight: 600;
}

.spinner {
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid #fff;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 8px;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

import { useState, useCallback } from 'react';
import {
  fetchalltasks,
  fetchOpenTasks,
  assignTask,
  submitWork,
  markTaskCompleted,
  addTaskFeedback,
  editTask,
  deleteTask
} from '../services/taskService';

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadAllTasks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchalltasks();
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks');
    }
    setLoading(false);
  }, []);

  const loadOpenTasks = useCallback(async (filters) => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchOpenTasks(filters);
      setTasks(data);
    } catch (err) {
      setError('Failed to load open tasks');
    }
    setLoading(false);
  }, []);

  const assign = useCallback(async (taskId, freelancerUid) => {
    setLoading(true);
    setError('');
    try {
      await assignTask(taskId, freelancerUid);
      await loadAllTasks();
    } catch (err) {
      setError('Failed to assign task');
    }
    setLoading(false);
  }, [loadAllTasks]);

  const submit = useCallback(async (taskId, submission) => {
    setLoading(true);
    setError('');
    try {
      await submitWork(taskId, submission);
      await loadAllTasks();
    } catch (err) {
      setError('Failed to submit work');
    }
    setLoading(false);
  }, [loadAllTasks]);

  const markCompleted = useCallback(async (taskId) => {
    setLoading(true);
    setError('');
    try {
      await markTaskCompleted(taskId);
      await loadAllTasks();
    } catch (err) {
      setError('Failed to mark as completed');
    }
    setLoading(false);
  }, [loadAllTasks]);

  const addFeedback = useCallback(async (taskId, review) => {
    setLoading(true);
    setError('');
    try {
      await addTaskFeedback(taskId, review);
      await loadAllTasks();
    } catch (err) {
      setError('Failed to add feedback');
    }
    setLoading(false);
  }, [loadAllTasks]);

  const edit = useCallback(async (taskId, updates) => {
    setLoading(true);
    setError('');
    try {
      await editTask(taskId, updates);
      await loadAllTasks();
    } catch (err) {
      setError('Failed to edit task');
    }
    setLoading(false);
  }, [loadAllTasks]);

  const remove = useCallback(async (taskId) => {
    setLoading(true);
    setError('');
    try {
      await deleteTask(taskId);
      await loadAllTasks();
    } catch (err) {
      setError('Failed to delete task');
    }
    setLoading(false);
  }, [loadAllTasks]);

  return {
    tasks,
    loading,
    error,
    loadAllTasks,
    loadOpenTasks,
    assign,
    submit,
    markCompleted,
    addFeedback,
    edit,
    remove
  };
} 
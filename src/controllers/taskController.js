// /api/tasks endpoint'lerinin iş mantığı
const { readTasks, writeTasks } = require("../utils/fileDb");

// Tüm görevleri listele
function getAllTasks(req, res) {
  const tasks = readTasks();
  res.status(200).json({ message: "Görevler listelendi", data: tasks });
}

// Tek görevin detayını getir
function getTaskById(req, res) {
  const tasks = readTasks();
  const task = tasks.find((t) => t.id === Number(req.params.id));

  if (!task) {
    return res.status(404).json({ message: "Görev bulunamadı" });
  }

  res.status(200).json({ message: "Görev bulundu", data: task });
}

// Yeni görev ekle
function createTask(req, res) {
  const { title, description, status, priority, assignee } = req.body;

  if (!title) {
    return res.status(400).json({ message: "title alanı zorunludur" });
  }

  const tasks = readTasks();
  const newId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
  const now = new Date().toISOString();

  const newTask = {
    id: newId,
    title,
    description: description || "",
    status: status || "todo",
    priority: priority || "medium",
    assignee: assignee || "",
    createdAt: now,
    updatedAt: now,
  };

  tasks.push(newTask);
  writeTasks(tasks);

  res.status(201).json({ message: "Görev oluşturuldu", data: newTask });
}

// Görevi güncelle (gönderilen alanlar değişir)
function updateTask(req, res) {
  const tasks = readTasks();
  const task = tasks.find((t) => t.id === Number(req.params.id));

  if (!task) {
    return res.status(404).json({ message: "Görev bulunamadı" });
  }

  const { title, description, status, priority, assignee } = req.body;

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (status !== undefined) task.status = status;
  if (priority !== undefined) task.priority = priority;
  if (assignee !== undefined) task.assignee = assignee;
  task.updatedAt = new Date().toISOString();

  writeTasks(tasks);

  res.status(200).json({ message: "Görev güncellendi", data: task });
}

// Görevi sil
function deleteTask(req, res) {
  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: "Görev bulunamadı" });
  }

  const [deletedTask] = tasks.splice(index, 1);
  writeTasks(tasks);

  res.status(200).json({ message: "Görev silindi", data: deletedTask });
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};

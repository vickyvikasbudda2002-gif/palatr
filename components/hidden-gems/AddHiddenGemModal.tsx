"use client";

import { useState } from "react";
import { Modal } from "@/components/common/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GEM_TYPES } from "@/utils/constants";
import { uploadImageToApi } from "@/utils/uploadImage";

interface AddHiddenGemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddHiddenGemModal({
  isOpen,
  onClose,
  onSuccess,
}: AddHiddenGemModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [mapsLink, setMapsLink] = useState("");
  const [mustTry, setMustTry] = useState("");
  const [gemType, setGemType] = useState("street food");
  const [customType, setCustomType] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    if (!description.trim()) {
      setError("Description is required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      let imageUrl = "";
      if (imageFile) {
        imageUrl = (await uploadImageToApi(imageFile, "gems")) ?? "";
      }

      const finalType =
        gemType === "custom" ? customType || "custom" : gemType;

      const res = await fetch("/api/hidden-gems/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          gem_type: finalType,
          maps_link: mapsLink,
          must_try_dishes: mustTry,
          image_url: imageUrl,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Failed to submit.");
        return;
      }

      setSubmitted(true);
      setTimeout(() => {
        onSuccess();
        onClose();
        setSubmitted(false);
        setName("");
        setDescription("");
        setMapsLink("");
        setMustTry("");
        setImageFile(null);
        setPreviewUrl("");
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="680px">
      {submitted ? (
        <>
          <div className="modal-title">Sent for<br />Approval.</div>
          <p className="modal-sub">
            Once approved, it will appear in the global Hidden Gems feed.
          </p>
        </>
      ) : (
        <>
          <div className="modal-title">Add Hidden<br />Gem</div>
          <p className="modal-sub">
            Share underrated places loved by locals across India. (Global Feed)
          </p>

          <Input
            placeholder="Hidden Gem Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Textarea
            placeholder="Description *"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            placeholder="Google Maps Link"
            value={mapsLink}
            onChange={(e) => setMapsLink(e.target.value)}
          />
          <Input
            placeholder="Must Try Dishes"
            value={mustTry}
            onChange={(e) => setMustTry(e.target.value)}
          />

          {/* Gem type selector */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            {GEM_TYPES.map((t) => (
              <button
                key={t.value}
                onClick={() => setGemType(t.value)}
                className={`gem-toggle-btn ${gemType === t.value ? "active" : ""}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {gemType === "custom" && (
            <Input
              placeholder="Custom type (e.g. Dhaba, Bakery)"
              value={customType}
              onChange={(e) => setCustomType(e.target.value)}
            />
          )}

          {/* Image upload */}
          <div className="upload-box">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm"
              style={{ color: "var(--muted)" }}
            />
            {previewUrl && (
              <div className="mt-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-2xl"
                  style={{ border: "2px solid var(--border)" }}
                />
              </div>
            )}
          </div>

          {error && (
            <p className="text-sm mt-3" style={{ color: "var(--primary)" }}>
              {error}
            </p>
          )}

          <Button
            variant="gem"
            size="lg"
            className="mt-6"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Send for Approval"}
          </Button>
          <Button variant="secondary" size="lg" onClick={onClose}>
            Back
          </Button>
        </>
      )}
    </Modal>
  );
}

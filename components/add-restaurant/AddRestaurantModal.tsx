"use client";

import { useState } from "react";
import { Modal } from "@/components/common/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { uploadImageToApi } from "@/utils/uploadImage";
import { useUser } from "@/hooks/useUser";

interface AddRestaurantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddRestaurantModal({
  isOpen,
  onClose,
  onSuccess,
}: AddRestaurantModalProps) {
  const { user } = useUser();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [mapsLink, setMapsLink] = useState("");
  const [mustTry, setMustTry] = useState("");
  const [type, setType] = useState("both");
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
      setError("Restaurant name is required.");
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
        imageUrl = (await uploadImageToApi(imageFile, "restaurants")) ?? "";
      }

      const res = await fetch("/api/restaurants/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          maps_link: mapsLink,
          must_try_dishes: mustTry,
          type,
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
            Once approved, it will appear in the{" "}
            <span style={{ color: "var(--primary2)", fontWeight: 700 }}>
              {user?.home_state}
            </span>{" "}
            feed.
          </p>
        </>
      ) : (
        <>
          <div className="modal-title">Add Missing<br />Restaurant</div>
          <p className="modal-sub">
            Will be sent to Admin Approval. Once approved, it will be added to
            the{" "}
            <span style={{ color: "var(--primary2)", fontWeight: 700 }}>
              {user?.home_state}
            </span>{" "}
            feed.
          </p>

          <Input
            placeholder="Restaurant Name *"
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
          <Select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="veg">Veg</option>
            <option value="nonveg">Non Veg</option>
            <option value="eggetarian">Eggetarian</option>
            <option value="both">Both</option>
          </Select>

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
            variant="primary"
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

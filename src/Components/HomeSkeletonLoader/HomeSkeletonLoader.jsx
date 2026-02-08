import React from 'react'
import './HomeSkeletonLoader.css'

// Hero Section Skeleton
export const HeroSectionSkeleton = () => {
    return (
        <div className="container">
            <div className="hero-skeleton-container">
                <div className="hero-skeleton-left">
                    <div className="skeleton-shimmer hero-skeleton-image"></div>
                </div>
                <div className="hero-skeleton-center">
                    <div className="skeleton-shimmer hero-skeleton-slider"></div>
                </div>
                <div className="hero-skeleton-right">
                    <div className="skeleton-shimmer hero-skeleton-image"></div>
                </div>
            </div>
        </div>
    )
}

// Bundles Home Skeleton
export const BundlesHomeSkeleton = () => {
    return (
        <div className="container" style={{marginBottom: '154px'}}>
            <div className="skeleton-heading-container">
                <div className="skeleton-shimmer skeleton-heading-title"></div>
                <div className="skeleton-shimmer skeleton-heading-subtitle"></div>
                <div className="skeleton-shimmer skeleton-heading-description"></div>
            </div>
            <div className="bundles-skeleton-container">
                <div className="skeleton-shimmer bundles-skeleton-main"></div>
            </div>
            <div className="bundles-details-skeleton">
                <div className="skeleton-shimmer bundles-detail-item"></div>
                <div className="skeleton-shimmer bundles-detail-item"></div>
                <div className="skeleton-shimmer bundles-detail-item"></div>
                <div className="skeleton-shimmer bundles-detail-item"></div>
            </div>
        </div>
    )
}

// Shop by Category Skeleton
export const ImageCardContainerSkeleton = () => {
    return (
        <div className="container">
            <div className="image-card-skeleton-container">
                <div className="skeleton-shimmer image-card-skeleton"></div>
                <div className="skeleton-shimmer image-card-skeleton"></div>
                <div className="skeleton-shimmer image-card-skeleton"></div>
            </div>
        </div>
    )
}

// Video Section Skeleton
export const VideoSectionSkeleton = () => {
    return (
        <div className="container">
            <div className="video-skeleton-container">
                <div className="video-skeleton-left">
                    <div className="skeleton-shimmer video-skeleton-title"></div>
                    <div className="skeleton-shimmer video-skeleton-desc"></div>
                    <div className="video-skeleton-tabs">
                        <div className="skeleton-shimmer video-skeleton-tab"></div>
                        <div className="skeleton-shimmer video-skeleton-tab"></div>
                        <div className="skeleton-shimmer video-skeleton-tab"></div>
                    </div>
                </div>
                <div className="skeleton-shimmer video-skeleton-player"></div>
            </div>
        </div>
    )
}

// Stories/Reviews Skeleton
export const StoriesHomeSkeleton = () => {
    return (
        <div className="container">
            <div className="stories-skeleton-container">
                <div className="stories-skeleton-stars">
                    <div className="skeleton-shimmer star-skeleton"></div>
                    <div className="skeleton-shimmer star-skeleton"></div>
                    <div className="skeleton-shimmer star-skeleton"></div>
                    <div className="skeleton-shimmer star-skeleton"></div>
                    <div className="skeleton-shimmer star-skeleton"></div>
                </div>
                <div className="skeleton-shimmer stories-skeleton-heading"></div>
                <div className="stories-skeleton-gallery">
                    <div className="skeleton-shimmer gallery-skeleton-item one"></div>
                    <div className="skeleton-shimmer gallery-skeleton-item two"></div>
                    <div className="skeleton-shimmer gallery-skeleton-item three"></div>
                    <div className="skeleton-shimmer gallery-skeleton-item four"></div>
                    <div className="skeleton-shimmer gallery-skeleton-item five"></div>
                </div>
            </div>
        </div>
    )
}

// Free Guide Skeleton
export const FreeGuideSkeleton = () => {
    return (
        <div className="container">
            <div className="skeleton-shimmer free-guide-skeleton"></div>
        </div>
    )
}

export default {
    HeroSectionSkeleton,
    BundlesHomeSkeleton,
    ImageCardContainerSkeleton,
    VideoSectionSkeleton,
    StoriesHomeSkeleton,
    FreeGuideSkeleton
}
